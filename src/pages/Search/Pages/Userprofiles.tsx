/**
 * 用户页
 */
import React from 'react'
import Profiles from 'common/Profiles'

interface IProps {
  data: { [props: string]: any }
}

function Userprofiles(props: IProps) {
  const { data: userprofiles } = props

  return (
    <div className='userprofiles'>
      <Profiles profiles={userprofiles.userprofiles ? userprofiles.userprofiles : []} />
    </div>
  )
}

export default Userprofiles
