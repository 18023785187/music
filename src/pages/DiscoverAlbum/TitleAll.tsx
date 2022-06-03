/**
 * 全部新碟
 */
import React, { memo, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ROOT_NAVPATH } from 'pages/path'

const path = [
  {
    name: '全部',
    path: `${ROOT_NAVPATH.ALBUM}?area=ALL`,
    line: '|'
  },
  {
    name: '华语',
    path: `${ROOT_NAVPATH.ALBUM}?area=ZH`,
    line: '|'
  },
  {
    name: '欧美',
    path: `${ROOT_NAVPATH.ALBUM}?area=EA`,
    line: '|'
  },
  {
    name: '韩国',
    path: `${ROOT_NAVPATH.ALBUM}?area=KR`,
    line: '|'
  },
  {
    name: '日本',
    path: `${ROOT_NAVPATH.ALBUM}?area=JP`
  },
]

function TitleAll() {

  return (
    <div className='u-title'>
      <h3 className='f-ff2'>
        <span>全部新碟</span>
      </h3>
      <div className='tab'>
        {
          path.map(item => {
            const { name, path, line } = item

            return (<Fragment key={name}>
              <Link to={path} className='hover'>{name}</Link>
              <span className='line'>{line}</span>
            </Fragment>)
          })
        }
      </div>
    </div>
  )
}

export default memo(TitleAll)
