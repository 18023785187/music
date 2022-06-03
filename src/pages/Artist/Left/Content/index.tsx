/**
 * 歌手内容展示区
 */
import React, { memo, useMemo } from 'react'
import { ARTISTS } from 'pages/path'
import Song from './Song'
import Album from './Album'
import Mv from './Mv'
import Desc from './Desc'

interface IProps {
  id: string,
  name: string,
  briefDesc: string,
  albumSize: number,
  mvSize: number,
  path: ARTISTS
}

function Content(props: IProps) {
  const { id, name, briefDesc, albumSize, mvSize, path } = props

  const ContentUI = useMemo(() => {
    switch (path) {
      case ARTISTS.ARTIST:
        return <Song id={id} />
      case ARTISTS.ALBUM:
        return <Album id={id} albumSize={albumSize} />
      case ARTISTS.MV:
        return <Mv id={id} mvSize={mvSize} />
      case ARTISTS.DESC:
        return <Desc id={id} name={name} briefDesc={briefDesc} />
      default:
        return <Song id={id} />
    }
  }, [id, name, briefDesc, albumSize, mvSize, path])

  return (
    <div>{ContentUI}</div>
  )
}

export default memo(Content)
