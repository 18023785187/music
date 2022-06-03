/**
 * 每项
 */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { USER } from 'pages/path'
import LazyLoad from '@/utils/LazyLoad'

interface IProps {
  profile: { [props: string]: any },
  even: boolean
}

function Item(props: IProps) {
  const { profile, even } = props
  const { userId, avatarUrl, nickname, authStatus, gender, signature } = profile

  useEffect(() => {
    LazyLoad.update()
  }, [avatarUrl])

  return (
    <tr className={`h-flag ${even ? 'even' : ''}`}>
      <td className='first w7'>
        <div className='u-cover'>
          <Link className='link' to={USER.HOME + `?id=${userId}`}>
            <img data-src={avatarUrl + '?param=50y50'} alt={nickname} width={50} height={50} />
            <span className="msk coverall" title={nickname}></span>
          </Link>
        </div>
      </td>
      <td>
        <div className='ttc'>
          <Link className='txt f-fs1 hover' to={USER.HOME + `?id=${userId}`} title={nickname}>
            {nickname}
            &nbsp;
            {authStatus ? <i className='icon2 u-icn2-music2'></i> : ''}
            {gender ? gender === 1 ? <i className='icnfix icon1 u-icn-s-01'></i> : <i className='icnfix icon1 u-icn-s-02 f-sep'></i> : ''}
          </Link>
        </div>
        <div className="dec s-fc4 f-thide" title={signature}>{signature}</div>
      </td>
      <td className='w9'>
        <span className='button u-btn-10'>
          <i>关注</i>
        </span>
      </td>
    </tr>
  )
}

export default Item
