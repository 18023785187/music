/**
 * 歌手mv
 */
import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { getArtistMv, cancelArtist } from 'network/artist'
import { MV } from 'pages/path'
import qs from 'qs'
import { LazyLoad } from 'utils'
import Page from 'common/Page'

interface IProps extends RouteComponentProps {
  id: string,
  mvSize: number
}

function Mv(props: IProps) {
  const { id, mvSize, location, history } = props
  const { pathname, search } = location
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])
  // mvs
  const [mvs, setMvs] = useState<{ [propName: string]: any }[]>([])

  useEffect(() => {
    const { offset } = parse

    getArtistMv(id, offset as string ?? 0).then((res: any) => {
      if (res.mvs) {
        setMvs(res.mvs)
        LazyLoad.update()
      }
    }).catch(rej => {

    })

    return () => {
      cancelArtist.cancelGetArtistMv && cancelArtist.cancelGetArtistMv()
    }
  }, [id, parse])

  const emitClick = useCallback((page: number | string) => {
    history.push(pathname + `?id=${id}&offset=${page}`)
  }, [history, id, pathname])

  return (
    <>
      <ul className='m-cvrlst-7'>
        {
          mvs.map((mv: { [propName: string]: any }) => {
            const { id, name, imgurl } = mv

            return <li key={id}>
              <div className='u-cover u-cover-7'>
                <img data-src={imgurl + '?param=137y103'} alt={name} width={137} height={103} />
                <Link className='msk coverall' to={MV + `?id=${id}`}></Link>
                <Link className='icon-play iconall' to={MV + `?id=${id}`}></Link>
              </div>
              <p className='dec'>
                <Link className='tit f-thide s-fc0 hover' to={MV + `?id=${id}`}>{name}</Link>
              </p>
            </li>
          })
        }
      </ul>
      <Page callback={emitClick} count={mvSize as number} limit={12} initPage={parse.offset != null ? Number(parse.offset) : 0} />
    </>
  )
}

export default memo(withRouter(Mv))
