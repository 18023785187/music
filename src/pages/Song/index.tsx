/**
 * 歌曲页
 */
import React, { useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import Left from './Left'
import Right from './Right'
import styles from './styles/index.module.less'

interface IProps extends RouteComponentProps { }

function Song(props: IProps) {
  const { location } = props
  const { search } = location
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])

  return (
    <div className={`${styles['song']} g-bd`}>
      {/* 左边 */}
      <Left id={parse.id as string} />
      {/* 右边 */}
      <Right id={parse.id as string} />
    </div>
  )
}

export default Song
