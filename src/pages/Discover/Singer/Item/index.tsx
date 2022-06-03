/**
 * 歌手项
 */
import React, { useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { USER } from 'pages/path'
import { LazyLoad } from 'utils'

interface IProps {
  item: any
}

function Item(props: IProps) {
  const { item } = props
  const { id, name, picUrl, alias } = item

  useEffect(() => {
    LazyLoad.update()
  }, [])

  return (
    <Link to={`${USER.HOME}?id=${id}`}>
      <div className='head'>
        <img data-src={picUrl + '?param=62y62'} alt={name} width={62} height={62} />
      </div>
      <div className='ifo'>
        <h4>
          <span className='f-thide'>{name}</span>
        </h4>
        <p className='f-thide'>{alias[0]}</p>
      </div>
    </Link>
  )
}

export default memo(Item)
