/**
 * 右边
 */
import React, { useState, useEffect, memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ARTIST } from 'pages/path'
import { getSimiArtist, cancelArtist } from 'network/artist'
import { LazyLoad } from '@/utils'
import About from 'common/About'

interface IProps {
  id: string
}

function Right(props: IProps) {
  const { id } = props
  // 相似歌手列表
  const [artists, setArtists] = useState<{ [propName: string]: any }[]>([])

  useEffect(() => {
    getSimiArtist(id).then((res: any) => {
      if (res.artists) {
        res.artists.length = 6
        setArtists(res.artists)

        LazyLoad.update()
      }
    }).catch(rej => {

    })

    return () => {
      cancelArtist.cancelGetSimiArtist && cancelArtist.cancelGetSimiArtist()
    }
  }, [id])

  // 相似歌手展示列表
  const Artists = useMemo(() => {
    return artists.map((artist: { [propName: string]: any }) => {
      const { name, id, img1v1Url } = artist

      return <li key={id}>
        <div className='hd'>
          <Link to={ARTIST + `?id=${id}`} title={name}>
            <img data-src={img1v1Url + '?param=50y50'} alt={name} width={50} height={50} />
          </Link>
        </div>
        <p>
          <Link className='nm f-thide' to={ARTIST + `?id=${id}`} title={name}>{name}</Link>
        </p>
      </li>
    })
  }, [artists])

  return (
    <div className='artist-right'>
      <div className='g-sd4'>
        <div className='g-wrap7'>
          {/* 相似歌手 */}
          {
            artists?.[0] && <>
              <h3 className='u-hd3'>相似歌手</h3>
              <ul className='m-hdlist'>{Artists}</ul>
            </>
          }
          {/* 关于 */}
          <About />
        </div>
      </div>
    </div>
  )
}

export default memo(Right)
