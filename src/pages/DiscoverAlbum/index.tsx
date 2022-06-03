/**
 * 新碟上架
 */
import React, { useEffect, useState, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ROOT_NAVPATH } from 'pages/path'
import qs from 'qs'
import TitleNew from './TitleNew'
import TitleAll from './TitleAll'
import Album from 'common/Album'
import Page from 'common/Page'
import _newest, { cancelNewest } from 'network/discover/newest'
import _getAlbumNewAll, { cancelGetAlbumNewAll } from 'network/album/getAlbumNewAll'
import styles from './styles/index.module.less'

interface IProps extends RouteComponentProps { }

function DiscoverAlbum(props: IProps) {
  const { location, history } = props
  const { search } = location
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])
  const [albumNew, setAlbumNew] = useState<{ [propName: string]: any }>({})
  const [albumAll, setAlbumAll] = useState<{ [propName: string]: any }>({})

  const emitClick = (page: number | string) => {
    const { area } = parse
    history.push(`${ROOT_NAVPATH.ALBUM}?${area ? `area=${area}&` : ''}offset=${page}`)
  }

  useEffect(() => {
    newest()

    async function newest() {
      const res: any = await _newest()
      try {
        if (res.code === 200) {
          res.albums.length = 10
          setAlbumNew(res)
        }
      } catch (e) {

      }
    }

    return () => {
      cancelNewest.cancelNewest && cancelNewest.cancelNewest()
    }
  }, [])

  useEffect(() => {
    const { area, offset } = parse
    getAlbumNewAll()

    async function getAlbumNewAll() {
      const res: any = await _getAlbumNewAll(area ? area as string : 'ALL', offset ? offset as string : 0)
      try {
        if (res.code === 200) {
          setAlbumAll(res)
          window.scrollTo(0, 0)
        }
      } catch (e) {

      }
    }

    return () => {
      cancelGetAlbumNewAll.cancelGetAlbumNewAll && cancelGetAlbumNewAll.cancelGetAlbumNewAll()
    }
  }, [parse])

  return (
    <div className={`${styles['discover-album']} g-bd`}>
      <div className='g-wrap'>
        <TitleNew />
        <Album albums={albumNew.albums || []} />
        <TitleAll />
        <Album albums={albumAll.albums || []} />
        <Page count={albumAll.total ?? 0} limit={35} initPage={parse.offset ? parseInt(parse.offset as string) : 0} callback={emitClick} />
      </div>
    </div>
  )
}

export default DiscoverAlbum
