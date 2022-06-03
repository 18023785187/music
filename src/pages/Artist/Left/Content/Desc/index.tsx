/**
 * 歌手介绍
 */
import React, { useState, useEffect, memo, Fragment } from 'react'
import { getArtistDesc, cancelArtist } from 'network/artist'

interface IProps {
  id: string,
  name: string,
  briefDesc: string
}

function Desc(props: IProps) {
  const { id, name, briefDesc } = props
  // 详细信息
  const [introduction, setIntroduction] = useState<{ [propName: string]: any }[]>([])

  useEffect(() => {
    getArtistDesc(id).then((res: any) => {
      if (res.introduction) {
        setIntroduction(res.introduction)
      }
    }).catch(rej => {

    })

    return () => {
      cancelArtist.cancelGetArtistDesc && cancelArtist.cancelGetArtistDesc()
    }
  }, [id])

  return (
    <div className='n-artdesc'>
      <h2>
        <i>&nbsp;</i>
        {name}简介
      </h2>
      <p>{briefDesc}</p>
      {
        introduction.map((desc: any) => {
          const { ti, txt } = desc

          return <Fragment key={txt}>
            <h2>{ti}</h2>
            <p className='z-indent'>{txt}</p>
          </Fragment>
        })
      }
    </div>
  )
}

export default memo(Desc)
