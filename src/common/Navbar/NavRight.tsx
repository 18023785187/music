/**
 * 常用的导航右侧
 */
import React, { Fragment, memo } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  path: string
}

function NavRight(props: IProps) {
  return (
    <Fragment>
      <Link className='hover m-t9' to={props.path}>更多</Link>
      <i className='v-hd2'></i>
    </Fragment>
  )
}

export default memo(NavRight)
