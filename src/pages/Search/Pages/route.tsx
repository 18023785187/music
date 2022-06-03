/**
 * 根据路径展示组件
 */
import React from 'react'
import Songs from './Songs'
import Artists from './Artists'
import Albums from './Albums'
import Videos from './Videos'
import Lyrics from './Lyrics'
import Playlists from './Playlists'
import DjRadios from './DjRadios'
import Userprofiles from './Userprofiles'

function route(type: string, data: { [propsName: string]: any }): JSX.Element {
  switch (type) {
    case '1':
      return <Songs data={data}></Songs>
    case '100':
      return <Artists data={data}></Artists>
    case '10':
      return <Albums data={data}></Albums>
    case '1014':
      return <Videos data={data}></Videos>
    case '1006':
      return <Lyrics data={data}></Lyrics>
    case '1000':
      return <Playlists data={data}></Playlists>
    case '1009':
      return <DjRadios data={data}></DjRadios>
    case '1002':
      return <Userprofiles data={data}></Userprofiles>
    default:
      return <Songs data={data}></Songs>
  }
}

export default route
