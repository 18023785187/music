/**
 * 热门歌手组件
 */
import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Item from './Item'
import { ROOT_ARTIST } from 'pages/path'
import _getArtistList, { cancel } from 'network/artist/getArtistList'

function Singer() {
  const [artists, setArtists] = useState<[]>([])

  useEffect(() => {
    getArtistList()

    function getArtistList() {
      _getArtistList(5).then((res: any) => {
        try {
          if (res.code === 200) {
            setArtists(res.artists)
          } else {
            // getArtistList()
          }
        } catch (e) {
          // console.log(e)
        }
      })
    }

    return () => {
      cancel.cancelGetArtistList && cancel.cancelGetArtistList()
    }
  }, [])

  return (
    <div className='singer'>
      <Navbar name='热门歌手' path={ROOT_ARTIST.SIGNED as any} />
      <ul className='enter clearfix'>
        {
          artists.map((item: any) => {
            return (
              <li key={item.id}><Item item={item} /></li>
            )
          })
        }
      </ul>
      <div>
        <a target="_blank" rel="noreferrer" href="https://music.163.com/st/musician" className="btn btn-img login-btn3">
          <i className="btn-img login-btn4">申请成为网易音乐人</i>
        </a>
      </div>
    </div>
  )
}

export default Singer
