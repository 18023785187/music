/**
 * 歌手每项
 */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ARTIST, USER } from 'pages/path'
import LazyLoad from '@/utils/LazyLoad'
import styles from './styles/index.module.less'

interface IProps {
  artist: any
}

function ArtistItem(props: IProps) {
  const { artist } = props
  const { picUrl, id, accountId, name } = artist

  useEffect(() => {
    LazyLoad.update()
  }, [])

  return (
    <li className={styles.artist}>
      <div className='cover'>
        <img data-src={picUrl + '?param=130y130'} alt={name} />
        <Link className='coverall u-cover-5' to={`${ARTIST}?id=${id}`} title={name + '的音乐'}></Link>
      </div>
      <p>
        <Link className='hover f-thide' to={`${ARTIST}?id=${id}`} title={name + '的音乐'}>{name}</Link>
        {
          accountId ? <Link to={`/${USER.HOME}?id=${accountId}`} title={name + '的个人主页'}>
            <i className='icon1 u-icn5'></i>
          </Link> : <></>
        }
      </p>
    </li>
  )
}

export default ArtistItem
