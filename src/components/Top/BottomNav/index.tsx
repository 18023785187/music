/**
 * 副导航栏
 */
import React, { memo, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { rootNav, NAVPATH, ROOT_NAVPATH } from '../typings'

interface IProps {
  showRootNav: boolean,
  location: any
}

function BottoNav(props: IProps) {
  const { showRootNav, location } = props

  const RootNav = useMemo(() => {
    return rootNav.map(item => {
      const { name, path } = item

      return (
        <li key={name}>
          <NavLink to={path}>
            <em className={
              path === location.pathname ||
                (location.pathname.indexOf(path) === 0 && path !== ROOT_NAVPATH.DISCOVER) ||
                (location.pathname === NAVPATH.ROOT && path === ROOT_NAVPATH.DISCOVER)
                ? 'em-high' : ''}>{name}
            </em>
          </NavLink>
        </li>
      )
    })
  }, [location])

  return (
    <>
      <div className='m-subnav m-subnav-up' style={{ display: !showRootNav ? 'block' : 'none' }}></div>
      <div className='m-subnav' style={{ display: showRootNav ? 'block' : 'none' }}>
        <div className='wrap'>
          <ul className='nav'>
            {RootNav}
          </ul>
        </div>
      </div>
    </>
  )
}

export default memo(BottoNav)
