/**
 * 歌手专辑
 */
import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { getArtistAlbum, cancelArtist } from 'network/artist'
import qs from 'qs'
import { ALBUM } from 'pages/path'
import { LazyLoad, formatDate } from 'utils'
import Page from 'common/Page'

interface IProps extends RouteComponentProps {
  id: string,
  albumSize: number
}

function Album(props: IProps) {
  const { id, albumSize, location, history } = props
  const { pathname, search } = location
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])
  // artist
  const [artist, setArtist] = useState<{ [propName: string]: any }[]>([])

  useEffect(() => {
    const { offset } = parse

    getArtistAlbum(id, offset as string ?? 0).then((res: any) => {
      if (res.hotAlbums) {
        setArtist(res.hotAlbums)
        LazyLoad.update()
      }
    }).catch(rej => {

    })

    return () => {
      cancelArtist.cancelGetArtistAlbum && cancelArtist.cancelGetArtistAlbum()
    }
  }, [id, parse])

  const emitClick = useCallback((page: number | string) => {
    history.push(pathname + `?id=${id}&offset=${page}`)
  }, [history, id, pathname])

  return (
    <div>
      <ul className='artist-album'>
        {
          artist.map((artist: { [propName: string]: any }) => {
            const { id, name, picUrl, publishTime } = artist

            return <li key={id}>
              <div className='u-cover u-cover-alb3'>
                <img data-src={picUrl + '?param=120y120'} alt={name} />
                <Link className='msk coverall' to={ALBUM + `?id=${id}`}></Link>
                <i className='icon-play iconall pointer' title='播放'></i>
              </div>
              <p className='dec dec-1 f-thide2 f-pre'>
                <Link className='tit s-fc0' to={ALBUM + `?id=${id}`}>{name}</Link>
              </p>
              <p>
                <span className='s-fc3'>{formatDate(new Date(publishTime), 'yyyy.MM.dd')}</span>
              </p>
            </li>
          })
        }
      </ul>
      <Page callback={emitClick} count={albumSize as number} limit={12} initPage={parse.offset != null ? Number(parse.offset) : 0} />
    </div>
  )
}

export default memo(withRouter(Album))
