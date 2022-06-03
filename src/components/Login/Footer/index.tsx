/**
 * 弹窗底部
 */
import React, { memo, Fragment } from 'react'

interface IProps {
  children: JSX.Element | [JSX.Element, JSX.Element]
}

function Footer(props: IProps) {
  const { children } = props

  return (
    <div className='footer'>
      {
        // 最多插入两个标签,默认样式可添加上footer-left、footer-right
        Object.prototype.toString.call(children) !== '[object Array]'
          ?
          (<div>{children}</div>)
          :
          (
            <Fragment>
              <div>{(children as [JSX.Element, JSX.Element])[0]}</div>
              <div>{(children as [JSX.Element, JSX.Element])[1]}</div>
            </Fragment>
          )
      }
    </div>
  )
}

export default memo(Footer)
