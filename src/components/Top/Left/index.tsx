/**
 * 顶部左边
 */
import React, { useMemo, memo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, NAVPATH } from '../typings'

interface IProps {
  showRootNav: boolean,
  location: any
}

function Left(props: IProps) {
  const { showRootNav, location } = props

  const Nav = useMemo(() => {
    return nav.map(item => {
      const { name, link, path } = item
      let pathTar: boolean
      if (path === NAVPATH.ROOT) {
        pathTar = showRootNav
      } else {
        pathTar = location.pathname === path
      }

      return (
        <li key={name} className={`top-nav-item ${path === NAVPATH.DOWNLOAD ? 'lst' : ''}`}>
          {
            !link
              ?
              <div className={pathTar ? 'high' : ''}>
                <NavLink exact to={path} className={pathTar ? 'high' : ''}>
                  {name}
                  <sub className='cor top' style={{ display: pathTar ? 'block' : 'none' }}></sub>
                  <sub className={`top ${path === NAVPATH.DOWNLOAD ? 'hot' : ''}`}></sub>
                </NavLink>
              </div>
              :
              <a href={link} target="_blank" rel="noreferrer">{name}</a>
          }
        </li>
      )
    })
  }, [showRootNav, location])

  return (
    <div className='top-left'>
      <h1 className="logo top pointer"><Link to={NAVPATH.ROOT}>网易云音乐</Link></h1>
      <ul className='top-nav'>
        {Nav}
      </ul>
    </div>
  )
}

export default memo(Left)
