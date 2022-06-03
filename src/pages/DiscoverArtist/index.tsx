/**
 * 首页导航歌手页
 */
import React, { useState, useCallback, useEffect, useMemo, memo } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import LeftList from './LeftList'
import ArtistItem from 'common/ArtistItem'
import { blk, initial } from './constant'
import getArtistList, { cancel } from 'network/artist/getArtistList'
import { ROOT_ARTIST, USER, ARTIST } from 'pages/path'
import styles from './styles/index.module.less'

interface IProps extends RouteComponentProps { }

function DiscoverArtist(props: IProps) {
  const { location } = props
  const { pathname, search } = location
  // 每页大标题
  const [title, setTitle] = useState<string>('');
  // initial的值
  const [initialRes, setInitialRes] = useState<string>(initial[0])
  // 展示数据
  const [artists, setArtists] = useState<any[]>([])
  // 由querystring解析出来对象
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])

  // 请求封装成函数传给子组件由子组件调用
  const getArtistListCallback = useCallback((
    limit: number,
    type: number,
    area: number,
    initial: string | number = -1,
    title: string
  ) => {
    cancel.cancelGetArtistList && cancel.cancelGetArtistList()

    getArtistList(
      limit,
      type,
      area,
      initial
    ).then((res: any) => {
      setTitle(title)
      try {
        setArtists(res.artists)
      } catch (e) {
        // console.log(e)
      }
    })
  }, [])

  useEffect(() => {
    try {
      // 及时更新initial值
      setInitialRes(parse.initial ? parse.initial as string : initial[0])
    } catch { }

    return () => {
      cancel.cancelGetArtistList && cancel.cancelGetArtistList()
    }
  }, [parse.initial])

  return (
    <div className={styles['discover-artist']}>
      <div className='g-bd2 w'>
        <div className='g-sd2'>
          <div className='g-left'>
            {/* 左边 */}
            {
              blk.map(item => <LeftList key={item.title} {...item} getArtistListCallback={getArtistListCallback} />)
            }
          </div>
        </div>
        <div className='g-mn2'>
          <div className='g-wrap'>
            <div className='u-title'>
              <h3>{title}</h3>
            </div>
            {
              pathname as any !== ROOT_ARTIST.SIGNED ? <ul className='ltlst'>
                {
                  initial.map(item => {
                    return <li key={item}>
                      <Link to={pathname + (parse.id ? `?id=${parse.id}` : '') + `&initial=${item}`} className={`hover ${initialRes === item ? 'high' : ''}`}>{
                        function () {
                          switch (item) {
                            case '-1':
                              return '热门';
                            case '0':
                              return '其他';
                            default:
                              return item;
                          }
                        }()
                      }</Link>
                    </li>
                  })
                }
              </ul> : <></>
            }
            <div>
              <ul className='m-cvrlst'>
                {
                  artists
                    .filter((_, index) => index < 10)
                    .map(artist => <ArtistItem key={artist.id} artist={artist} />)
                }
                <li className='line'></li>
                {
                  artists
                    .filter((_, index) => index > 9)
                    .map(artist => <li className='sml' key={artist.id}>
                      <Link className='hover f-thide nm' to={`${ARTIST}?id=${artist.id}`} title={`${artist.name}的音乐`}>{artist.name}</Link>
                      {
                        artist.accountId ? <Link className='i' to={`/${USER.HOME}?id=${artist.accountId}`} title={artist.name + '的个人主页'}>
                          <i className='icon1 u-icn5'></i>
                        </Link> : <></>
                      }
                    </li>)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(DiscoverArtist)
