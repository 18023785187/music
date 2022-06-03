/**
 * 声音主播页
 */
import React, { useEffect } from 'react'
import { DJRADIO, USER } from 'pages/path'
import { Link } from 'react-router-dom'
import LazyLoad from '@/utils/LazyLoad'

interface IProps {
  data: { [propName: string]: any }
}

function DjRadios(props: IProps) {
  const { data: djRadios } = props

  useEffect(() => {
    LazyLoad.update()
  })

  return (
    <div className='dj-radios clearfix'>
      <h2 className='head2'>声音主播</h2>
      <ul className='m-rdilist'>
        {
          djRadios.djRadios && djRadios.djRadios.map((item: any) => {
            const { id, picUrl, name, dj } = item
            const { nickname, userId, gender, authStatus } = dj

            return (
              <li key={id}>
                <Link className='u-cover-rdi2' to={DJRADIO + `?id=${id}`}>
                  <img data-src={picUrl + '?param=150y150"'} alt={name} width={150} height={150} />
                </Link>
                <h3 className='f-fs2 f-thide'>
                  <Link className='s-fc1 hover' to={DJRADIO + `?id=${id}`}>{name}</Link>
                </h3>
                <p className='f-thide s-fc4'>
                  by&nbsp;
                  <Link className='hover' to={USER.HOME + `?id=${userId}`}>{nickname}</Link>
                  &nbsp;
                  {authStatus ? <i className='icon2 u-icn2-music2'></i> : ''}
                  {gender ? gender === 1 ? <i className='icon1 u-icn-s-01 f-sep'></i> : <i className='icon1 u-icn-s-02 f-sep'></i> : ''}
                </p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default DjRadios
