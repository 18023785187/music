/**
 * 头像，可进入个人主页
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { SONG } from 'pages/path'

interface IProps {
  id?: number
  imgUrl?: string
}

const initImgUrl = 'http://s4.music.126.net/style/web2/img/default/default_album.jpg'

function Head(props: IProps) {
  const { imgUrl, id } = props

  return (
    <div className='head'>
      <img src={imgUrl ? imgUrl + '?param=34y34' : initImgUrl} alt="头像" width={34} height={34} />
      {id ? <Link className='playbar-img link' to={SONG + `?id=${id}`}></Link> : <i className='playbar-img link pointer'></i>}
    </div>
  )
}

export default Head
