/**
 * 二维码登录
 */
import React, { useState, useEffect, useRef, useCallback, useMemo, useContext, Fragment } from 'react'
import Context from '../Context'
import { cancelQR, createQRkey, createQRCode, checkQRCodeStatus } from 'network/login/qr-code'
import { AWAIT, STATUS, ISetStateProps } from '../typing'

interface IProps {
  stateCode: STATUS
}

let qrKey: string | null | undefined = null
let _STATUS: STATUS

function QRLogin(props: IProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  // canvas
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // 是否显示刷新器
  const [refresh, setRefresh] = useState(false)
  // 是否显示已扫码
  const [state, setState] = useState(AWAIT.PENDING)
  const { setStateCallback, showComponent } = useContext(Context) as ISetStateProps

  // 刷新二维码按钮
  const refreshClick = useCallback(() => {
    setRefresh(false)
  }, [])
  // 切换界面
  const mainClick = useCallback(() => {
    setStateCallback(STATUS.MAIN)
    setState(AWAIT.PENDING)
    setRefresh(false)
  }, [setStateCallback])

  useEffect(() => {
    // 根据状态发请求
    _STATUS = props.stateCode
    if (props.stateCode === STATUS.QR && refresh === false) {
      requestQr()
    }

    // 发请求
    async function requestQr() {
      let timestamp: number
      let _qrKey: string | null | undefined
      if (state !== AWAIT.FULLFILLED) {
        if (cancelQR.cancelCreateQRkey) {
          cancelQR.cancelCreateQRkey()
        }
        const qrKeyRes = await createQRkey()
        if (!qrKeyRes) return
        qrKey = qrKeyRes.data.unikey
        _qrKey = qrKey

        const qrURL: string = (await createQRCode(qrKey as string)).data.qrimg
        const img = new Image()
        img.src = qrURL
        img.onload = function () {
          if (canvasRef.current) {
            const ctx: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d')
            ctx?.drawImage(img, -15, -15, 160, 160)
          }
        }

        if (_STATUS !== STATUS.QR || _qrKey !== qrKey) {
          return
        }
      }
      checkQr()

      async function checkQr() {
        if (_STATUS !== STATUS.QR || _qrKey !== qrKey) {
          return
        }
        !timestamp && (timestamp = Date.now())

        const stauts: any = await checkQRCodeStatus(qrKey as string)
        if (!stauts) return
        // 超出60秒停止轮询，并弹出刷新框
        if (Date.now() - timestamp >= 60000) {
          setRefresh(true)
          qrKey = null
        }

        if (stauts.code === 802) {
          setState(AWAIT.FULLFILLED)
          timestamp = Date.now()
        } else if (stauts.code === 803) {
          qrKey = null
          window.location.reload()
          window.scrollTo(0, 0)
        }

        if (qrKey) window.setTimeout(checkQr)
      }
    }

    return () => {
      const r = rootRef
      if (props.stateCode !== STATUS.QR || refresh || !r.current) {
        qrKey = null
      }
    }
  }, [props.stateCode, refresh, state])

  // 内联样式
  const refreshStyles = useMemo(() => ({
    display: refresh ? 'block' : 'none'
  }), [refresh])

  const Scan = useMemo(() => (
    <Fragment>
      <div className='qr_main'>
        <div className='qr_phone'></div>
        <div className='right'>
          <div className='title'>扫码登录</div>
          <div className='qr_code'>
            <div className='qr_code_content'>
              <canvas ref={canvasRef} width={130} height={130}></canvas>
              <div className='refresh' style={refreshStyles}>
                <p>二维码已失效</p>
                <button onClick={refreshClick}>点击刷新</button>
              </div>
            </div>
          </div>
          <p className="txt">
            使用&nbsp;<a className="download-link hover" href="https://music.163.com/#/download" target="_blank" rel="noreferrer">网易云音乐APP</a>&nbsp;扫码登录
          </p>
        </div>
      </div>
    </Fragment>
  ), [refreshStyles, refreshClick]);
  const Success = useMemo(() => (
    <Fragment>
      <div className='suc'>
        <div className='suc-icon'></div>
        <p className='suc-txt'>扫描成功</p>
      </div>
      <div className='confirm'>请在手机上确认登录</div>
    </Fragment>
  ), [])

  return (
    <div className='qr' style={showComponent(STATUS.QR)} ref={rootRef}>
      {
        state === AWAIT.PENDING ? Scan : Success
      }
      <div className='otherbtn'>
        <div className='other pointer' onClick={mainClick}>选择其他登录模式</div>
      </div>
    </div>
  )
}

export default QRLogin
