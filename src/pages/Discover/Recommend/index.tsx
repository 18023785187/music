/**
 * 热门推荐
 */
import React, { useState, useEffect, useMemo, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'common/Navbar'
import NavRight from 'common/Navbar/NavRight'
import Recommend from 'common/Recommend'
import { ROOT_NAVPATH } from 'pages/path'
import personalized, { cancelPersonalized } from 'network/discover/personalized'

const navList = [
  {
    name: '华语',
    path: ROOT_NAVPATH.PLAYLIST,
    id: Math.random()
  },
  {
    name: '流行',
    path: ROOT_NAVPATH.PLAYLIST,
    id: Math.random()
  },
  {
    name: '摇滚',
    path: ROOT_NAVPATH.PLAYLIST,
    id: Math.random()
  },
  {
    name: '民谣',
    path: ROOT_NAVPATH.PLAYLIST,
    id: Math.random()
  },
  {
    name: '电子',
    path: ROOT_NAVPATH.PLAYLIST,
    id: Math.random()
  },
]

function DiscoverRecommend() {
  const [recommends, setRecommends] = useState<[]>([])

  useEffect(() => {
    personalized().then((res: any) => {
      try {
        if (res.code === 200) {
          setRecommends(res.result)
        }
      } catch (e) {
        //  console.log(e) 
      }
    })

    return () => {
      cancelPersonalized.cancelPersonalized && cancelPersonalized.cancelPersonalized()
    }
  }, [])

  const NavLeft = useMemo(() => (<Link to={ROOT_NAVPATH.PLAYLIST}>热门推荐</Link>), [])

  const NavCenter = useMemo(() => (<div className='tab' key='center'>{
    navList.map((item, index) => {
      const { name, path, id } = item
      if (index !== navList.length - 1) {
        return (
          <Fragment key={id}>
            <Link to={`${path}?cat=${name}`} className='hover'>{name}</Link>
            <span className='line'>|</span>
          </Fragment>
        )
      } else {
        return <Link key={id} to={`${path}?cat=${name}`} className='hover'>{name}</Link>
      }
    })
  }</div>), [])

  return (
    <div className='discover-recommend'>
      <Navbar left={NavLeft} center={NavCenter} right={<NavRight path={ROOT_NAVPATH.PLAYLIST} />} />
      {/* 展示区 */}
      <Recommend recommends={recommends} />
    </div>
  )
}

export default DiscoverRecommend
