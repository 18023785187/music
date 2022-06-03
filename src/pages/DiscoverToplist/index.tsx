/**
 * 排行榜
 */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IRootReducer } from 'store'
import { toplistAcion } from 'store/acions'
import SessionStorage, { TOPLIST } from '@/utils/sessionStorage'
import _getToplist, { cancelGetToplist } from 'network/toplist/toplist'
import Left from './Left'
import Header from './Header'
import Sing from './Sing'
import styles from './styles/index.module.less'

interface IProps { }

function DiscoverToplist(props: IProps) {
  const toplistData: { [propName: string]: any }[] = useSelector((state: IRootReducer) => state.toplistReducer.toplist);
  const dispatch = useDispatch()

  useEffect(() => {
    // 获取所有榜单
    window.scrollTo(0, 0)
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

  return (
    <div className={`${styles['discover-toplist']} g-bd`}>
      <Left toplistData={toplistData} />
      <div className='main'>
        <div className='g-wrap'>
          <Header toplistData={toplistData} />
        </div>
        {toplistData.length ? <Sing defaultId={toplistData[0].id} /> : ''}
      </div>
    </div>
  )
}

export default DiscoverToplist
