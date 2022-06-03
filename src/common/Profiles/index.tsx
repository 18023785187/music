/**
 * 用户信息页
 */
import React from 'react'
import Item from './Item'
import styles from './styles/index.module.less'

interface IProps {
  profiles: []
}

function Profiles(props: IProps) {
  const { profiles } = props

  return (
    <table className={styles['profiles']} cellSpacing="0" cellPadding="0">
      <tbody>
        {
          profiles.map((profile: any, index: number) => <Item key={profile.userId} profile={profile} even={index % 2 === 1} />)
        }
      </tbody>
    </table>
  )
}

export default Profiles
