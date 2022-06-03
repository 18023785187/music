/**
 * 导航
 */
import React, { useState, useEffect, useCallback, useMemo, Fragment } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import { ROOT_NAVPATH } from 'pages/path'
import _getPlaylistCatlist from 'network/playlist/getPlaylistCatlist'
import wLocalStoreage, { CATLIST } from '@/utils/localStorage'
import { escapeSymbol } from 'utils'

interface IProps extends RouteComponentProps {

}

function Navbar(props: IProps) {
  const { location } = props
  const { search } = location
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])
  const [catlist, setCatlist] = useState<any>({})
  const [list, setList] = useState<[string[], string[], string[], string[], string[]]>([[], [], [], [], []])
  const [showDown, setShowDown] = useState<boolean>(false)

  const getList = useCallback((sub: any[] | null): [string[], string[], string[], string[], string[]] => {
    if (!sub || !sub?.length) return [[], [], [], [], []]
    const res: [string[], string[], string[], string[], string[]] = [[], [], [], [], []]
    sub.forEach(item => {
      const { category, name } = item
      res[category].push(name)
    })
    return res
  }, [])

  useEffect(() => {
    document.addEventListener('click', click)

    if (wLocalStoreage.getItem(CATLIST)) {
      const c = JSON.parse(wLocalStoreage.getItem(CATLIST) as string)
      setCatlist(c)
      setList(getList(c.sub))
    } else {
      getPlaylistCatlist()
    }

    function getPlaylistCatlist() {
      _getPlaylistCatlist().then((res: any) => {
        try {
          if (res.code === 200) {
            setCatlist(res)
            setList(getList(res.sub))
            wLocalStoreage.setItem(CATLIST, JSON.stringify(res))
          } else {
            getPlaylistCatlist()
          }
        } catch (e) {

        }
      })
    }

    function click() {
      setShowDown(false)
    }

    return () => {
      document.removeEventListener('click', click)
    }
  }, [getList])

  const showClick = useCallback((e) => {
    e.stopPropagation()
    setShowDown(!showDown)
  }, [showDown])

  const icnImgStyle = useCallback((index: number): string => {
    switch (index) {
      case 0:
        return 'u-icn-71'
      case 1:
        return 'u-icn-6'
      case 2:
        return 'u-icn-7'
      case 3:
        return 'u-icn-8'
      case 4:
        return 'u-icn-9'
      default:
        return 'u-icn-71'
    }
  }, [])

  return (
    <>
      <div className='u-title'>
        <h3>
          <span className='f-ff2'>{parse.cat ? parse.cat : '全部'}</span>
          <span className='pointer menu login-btn3 btn-img' onClick={showClick}>
            <i className='pointer login-btn4 btn-img'>
              选择分类
              <em className="icon1 down"></em>
            </i>
          </span>
        </h3>
      </div>
      {/* 分类框 */}
      <div className='catlist' style={{ display: showDown ? 'block' : 'none' }}>
        <div className='hd sltlyr'>
          <i className='iconall icn'></i>
        </div>
        <div className='bd sltlyr'>
          <h3>
            <Link className='pointer u-btn-g button hover' to={ROOT_NAVPATH.PLAYLIST}>
              <em>全部风格</em>
            </Link>
          </h3>
          {
            catlist.categories ? Object.values(catlist.categories).map((item: any, index) => {
              return (
                <dl key={item}>
                  <dt>
                    <i className={`icon1 ${icnImgStyle(index)}`}></i>
                    {item}
                  </dt>
                  <dd className={index === 4 ? 'last' : ''}>
                    {
                      list[index].map(link => (
                        <Fragment key={link}>
                          <Link className='hover' to={`${ROOT_NAVPATH.PLAYLIST}?cat=${escapeSymbol(link)}`}>{link}</Link>
                          <span className="line">|</span>
                        </Fragment>
                      )
                      )
                    }
                  </dd>
                </dl>
              )
            }) : <></>
          }
        </div>
        <div className="ft sltlyr"></div>
      </div>
    </>
  )
}

export default withRouter(Navbar)
