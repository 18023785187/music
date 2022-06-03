/**
 * 歌词每项
 */
import React, { useState, useCallback, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ALBUM, ARTIST, MV, SONG } from 'pages/path'
import { useAddSong, usePlaySong } from 'components/Player/useFunc'
import { formatDate } from 'utils'
import { getSongDetail } from 'network/song'
import styles from './styles/index.module.less'

interface IProps {
  lyric: { [propsName: string]: any },
  even: boolean
}

function Lyric(props: IProps) {
  const { lyric, even } = props
  const { lyrics, duration, album, artists, mvid, id, name } = lyric
  const { txt, range } = lyrics ? lyrics : { txt: '', range: [{}] }
  const { name: albumName, id: albumId } = album
  const { first, second } = range[0]
  const [show, setShow] = useState<boolean>(false)
  const addSong = useAddSong()
  const playSong = usePlaySong()

  const addSongClick = useCallback((id: number | string) => {
    getSongDetail(id).then((res: any) => {
      try {
        addSong(res.songs[0])
      } catch (e) {

      }
    })
  }, [addSong])

  const playSongClick = useCallback((id: number | string) => {
    getSongDetail(id).then((res: any) => {
      try {
        playSong(res.songs[0])
      } catch (e) {

      }
    })
  }, [playSong])

  const handlerTxt = useCallback((c: number = -1): string => {
    if (!txt) return ''

    const keywords = txt.substring(first, second)
    let t: string = txt.substring(first).replace(new RegExp(keywords, 'g'), `<span class='s-fc7'>${keywords}</span>`)
    let res: string = '<p>' + t.replace(/\n/g, '</p><p>\n')
    if (c === -1) return res.substring(0, res.length - 4)

    let r: string = ''
    for (let i = 0; i < c; i++) {
      const pos: number = res.indexOf('\n')
      if (pos === -1) return r.substring(0, r.length - 4)
      r += res.substring(0, pos)
      res = res.substring(pos + 1)
    }
    return r.substring(0, r.length - 4)
  }, [txt, first, second])

  return (
    <>
      <div className={`${styles['item']} ${even ? styles['even'] : ''}`}>
        <div className='box'>
          <div className='td'>
            <div className='hd'>
              <i className='ply table-img pointer' title='播放' onClick={() => playSongClick(lyric.id)}></i>
            </div>
          </div>
          <div className='td w0'>
            <div className='sn'>
              <div className='text'>
                <Link className='hover' to={SONG + `?id=${id}`} title={name}>{name}</Link>
                {
                  mvid !== 0 ? <Link className='mv table-img' title='MV' to={MV + `?id=${mvid}`}></Link> : ''
                }
              </div>
            </div>
          </div>
          <div className='td'>
            <div className='hshow'>
              <span className='pointer icon1 u-btn u-icn81' title="添加到播放列表" onClick={() => addSongClick(lyric.id)}></span>
              <span className='pointer icon1 u-btn icn icn-fav' title="收藏"></span>
              <span className='pointer icon1 u-btn icn icn-share' title="分享"></span>
              <span className='pointer table-img u-btn icn icn-dl' title="下载"></span>
            </div>
          </div>
          <div className='td w1'>
            <div className='text'>
              {
                artists.map((artist: any, index: number) => {
                  const { name, id } = artist

                  if (index !== artists.length - 1) {
                    return (<Fragment key={id}>
                      <Link className='hover' to={ARTIST + `?id=${id}`}>{name}</Link>/
                    </Fragment>)
                  } else {
                    return <Link key={id} className='hover' to={ARTIST + `?id=${id}`}>{name}</Link>
                  }
                })
              }
            </div>
          </div>
          <div className='td w2'>
            <div className='text'>
              <Link className='hover s-fc3' to={ALBUM + `?id=${albumId}`} title={albumName}>《{albumName}》</Link>
            </div>
          </div>
          <div className='td'>{formatDate(new Date(duration), 'mm:ss')}</div>
        </div>
      </div>
      {/* 歌词 */}
      {
        txt ? <div className={styles['lyric']}>
          <div style={{ display: show ? 'none' : 'block' }} dangerouslySetInnerHTML={{ __html: handlerTxt(4) }}></div>
          <div style={{ display: show ? 'block' : 'none' }} dangerouslySetInnerHTML={{ __html: handlerTxt() }}></div>
          <div className='crl'>
            <span className='pointer' onClick={() => setShow(!show)}>
              {
                show ? (<>
                  收起
                  <i className='icon1 u-icn-70'></i>
                </>) : (<>
                  展开
                  <i className='icon1 u-icn-69'></i>
                </>)
              }
            </span>
          </div>
        </div> : ''
      }
    </>
  )
}

export default Lyric
