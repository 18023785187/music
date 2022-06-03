/**
 * 歌单页
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import Navbar from './Navbar'
import Recommend from 'common/Recommend'
import Page from 'common/Page'
import getPlaylist, { cancelGetPlaylist } from 'network/playlist/getPlaylist'
import { ROOT_NAVPATH } from 'components/Top/typings'
import styles from './styles/index.module.less'

interface IProps extends RouteComponentProps {
}

function DiscoverPlaylist(props: IProps) {
  const { location, history } = props
  const { search } = location
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])
  const [data, setData] = useState<{ [propName: string]: any }>({})

  const emitClick = useCallback((page: number | string) => {
    const { cat } = parse
    history.push(ROOT_NAVPATH.PLAYLIST + `?cat=${cat ? cat as string : '全部'}&offset=${page}`)
  }, [parse, history])

  useEffect(() => {
    const { cat, offset } = parse
    getPlaylist(cat ? cat as string : '全部', offset ? offset as string : 0).then(res => {
      if (res) {
        // console.log(res)
        window.scrollTo(0, 0)
        setData(res)
      } else {

      }
    })

    return () => {
      cancelGetPlaylist.cancelGetPlaylist && cancelGetPlaylist.cancelGetPlaylist()
    }
  }, [parse])

  return (
    <div className={`${styles['discover-playlist']} g-bd`}>
      <div className='g-wrap'>
        {/* 导航 */}
        <Navbar />
        <Recommend recommends={data?.playlists || []} />
        <Page limit={35} count={data.total ?? 0} callback={emitClick} initPage={parse.offset ? parseInt(parse.offset as string) : 0} />
      </div>
    </div>
  )
}

export default DiscoverPlaylist
