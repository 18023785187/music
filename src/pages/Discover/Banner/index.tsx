/**
 * 轮播图组件
 */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import _getBanner, { cancelgetBanner } from 'network/discover/banner'
import { NAVPATH } from 'pages/path'
import { preload } from 'utils'
import fiflterType from './fiflterType'

type bannerInfo = {
  imgUrl: string,
  targetId: number,
  scm: string,
  targetType: number,
  url: string
}

function Banner() {
  // 轮播图
  const [banners, setBanners] = useState<bannerInfo[]>([])
  // 当前轮播项
  const [idx, setIdx] = useState<number>(0)

  // 定时器
  const timerRef = useRef<number | null>(null)
  const timerOut1Ref = useRef<number | null>(null)
  const timerOut2Ref = useRef<number | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // 发请求
    getBanner()

    function getBanner() {
      _getBanner().then((res: any) => {
        try {
          const b = res.banners.map((item: any) =>
          ({
            imgUrl: item.imageUrl,
            targetId: item.targetId,
            scm: item.scm,
            targetType: item.targetType
          }))

          b.forEach((item: bannerInfo) => {
            preload(item.imgUrl)
          })
          setBanners(b)
        } catch (e) {
          // getBanner()
          // console.log(e)
        }
      })
    }

    return () => {
      cancelgetBanner.cancelgetBanner && cancelgetBanner.cancelgetBanner()
    }
  }, [])

  useEffect(() => {
    if (banners.length) {
      run()
    }

    return () => {
      stop()
      window.clearInterval(timerOut1Ref.current as number)
      window.clearInterval(timerOut2Ref.current as number)
    }
  })

  // 改变轮播图位置
  const changeIdx = useCallback(function (isNext: boolean = true) {
    const len = banners.length - 1
    const curIdx = isNext ? idx + 1 : idx - 1

    if (curIdx < 0) {
      setIdx(banners.length - 1)
    } else if (curIdx > len) {
      setIdx(0)
    } else {
      setIdx(curIdx)
    }
  }, [banners.length, idx])

  // 跑轮播图
  const run = useCallback(function () {
    timerRef.current = window.setInterval(() => {
      if (imgRef.current) {
        imgRef.current.style.transition = 'opacity 1s ease-in 0s'
        imgRef.current.style.opacity = '0.2'
        timerOut1Ref.current = window.setTimeout(() => {
          changeIdx()

          imgRef.current!.style.transition = 'opacity 1s ease-out 0s'
          imgRef.current!.style.opacity = '1'
          timerOut2Ref.current = window.setTimeout(() => {
            imgRef.current!.style.transition = 'none 0s ease 0s'
          }, 1000)
        }, 1000)
      }
    }, 4000)
  }, [changeIdx])

  // 停止轮播图
  const stop = useCallback(function () {
    window.clearInterval(timerRef.current as number)
  }, [])

  return (
    <div className='banner' onMouseMove={stop} onMouseOut={run}>
      <div className='banner-bg' style={{ background: `url(${banners[idx]?.imgUrl}) no-repeat` }}>
        <div className='w banner-box'>
          <div className='banner-content'>
            {
              !banners[idx]?.url ? (
                <Link to={fiflterType(banners[idx]?.targetType) + '/?id=' + banners[idx]?.targetId}>
                  <img ref={imgRef} src={banners[idx]?.imgUrl} alt={banners[idx]?.targetId.toString()} width={730} height={285} />
                </Link>
              ) : (
                <a href={banners[idx]?.url} target='_blank' rel="noreferrer">
                  <img ref={imgRef} src={banners[idx]?.imgUrl} alt={banners[idx]?.targetId.toString()} width={730} height={285} />
                </a>
              )
            }
            <div className='dots'>
              {/* 轮播点 */}
              {
                banners.map((item, index) => {
                  return (
                    <div
                      className={`btn-img dots-item pointer ${idx === index ? 'dots-high' : ''}`}
                      key={item.scm}
                      onClick={() => { setIdx(index) }}></div>
                  )
                })
              }
            </div>
          </div>
          <div className='b-download'>
            <div className='shadow banner-shadow'></div>
            <div className='img download'>
              <Link className='download' to={NAVPATH.DOWNLOAD}>下载客户端</Link>
              <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
            </div>
            <div className='shadowr banner-shadow'></div>
          </div>
          <div className='btn btn-left btn-img pointer' onClick={(e) => { e.stopPropagation(); imgRef.current!.style.transition = 'none 0s ease 0s'; changeIdx(false) }} onMouseMove={stop}></div>
          <div className='btn btn-right btn-img pointer' onClick={(e) => { e.stopPropagation(); imgRef.current!.style.transition = 'none 0s ease 0s'; changeIdx() }} onMouseMove={stop}></div>
        </div>
      </div>
    </div>
  )
}

export default Banner
