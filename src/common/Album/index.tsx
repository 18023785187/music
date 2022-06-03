/**
 * 唱碟组件
 */
import React, { useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { ALBUM, ARTIST } from 'pages/path'
import LazyLoad from '@/utils/LazyLoad'
import styles from './styles/index.module.less'

interface IProps {
  albums: { [propName: string]: any }[]
}

function Album(props: IProps) {
  const { albums } = props

  useEffect(() => {
    LazyLoad.update()
  })

  return (
    <ul className={styles['album']}>
      {
        albums.map(item => {
          const { name, id, picUrl, artist } = item
          const { name: uname, id: uid } = artist

          return (
            <li key={id}>
              <div className='cover'>
                <img data-src={`${picUrl}?param=130y130`} alt={name} width={130} height={130} />
                <Link className='coverall msk' to={`${ALBUM}?id=${id}`} title={name}></Link>
                <i className='play iconall pointer' title='播放'></i>
              </div>
              <p className='dec f-thide hover'>
                <Link to={`${ALBUM}?id=${id}`} title={name}>{name}</Link>
              </p>
              <p className='f-thide'>
                <span className='hover' title={uname}>
                  <Link to={`${ARTIST}?id=${uid}`}>{uname}</Link>
                </span>
              </p>
            </li>
          )
        })
      }
    </ul>
  )
}

export default memo(Album)
