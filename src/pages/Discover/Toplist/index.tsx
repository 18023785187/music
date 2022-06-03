/**
 * 新碟组件
 */
import React, { useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ROOT_NAVPATH } from 'pages/path'
import { useSelector, useDispatch } from 'react-redux'
import { IRootReducer } from 'store'
import { toplistAcion } from 'store/acions'
import SessionStorage, { TOPLIST } from '@/utils/sessionStorage'
import Navbar from 'common/Navbar'
import NavRight from 'common/Navbar/NavRight'
import List from './List'
import _getToplist, { cancelGetToplist } from 'network/toplist/toplist'

function Toplist() {
  const toplistData = useSelector((state: IRootReducer) => state.toplistReducer.toplist);
  const dispatch = useDispatch()

  useEffect(() => {
    // 获取所有榜单
    getToplist()

    function getToplist() {
      if (!SessionStorage.getItem(TOPLIST)) {
        _getToplist().then((res: any) => {
          try {
            if (res.code === 200) {
              SessionStorage.setItem(TOPLIST, JSON.stringify(res.list))
              dispatch(toplistAcion(res.list))
            } else {
              getToplist()
            }
          } catch (e) {
            // console.log(e)
          }
        })
      } else {
        dispatch(toplistAcion(JSON.parse(SessionStorage.getItem(TOPLIST) as string)))
      }
    }

    return () => {
      cancelGetToplist.cancelGetToplist && cancelGetToplist.cancelGetToplist()
    }
  }, [dispatch])

  const NavLeft = useMemo(() => (<Link to={ROOT_NAVPATH.TOPLIST}>榜单</Link>), [])

  // 获取前三个榜单，用于在首页展示
  const getList = useCallback(() => {
    if (!toplistData.length) return

    const res: {}[] = []
    for (let i = 0; i < 3; i++) {
      res.push(toplistData[i])
    }
    return res.map((item: any) => {
      const { id, name, coverImgUrl } = item

      return <List key={id} id={id} name={name} imgUrl={coverImgUrl} />
    })
  }, [toplistData])

  return (
    <div className='toplist'>
      <Navbar left={NavLeft} right={<NavRight path={ROOT_NAVPATH.TOPLIST} />} />
      <div className='n-blist'>
        {getList()}
      </div>
    </div>
  )
}

export default Toplist
