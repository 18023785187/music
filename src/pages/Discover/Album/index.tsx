/**
 * 新碟组件
 */
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'common/Navbar'
import NavRight from 'common/Navbar/NavRight'
import Slide from 'common/Slide'
import { ROOT_NAVPATH, ALBUM, ARTIST } from 'pages/path'
import { ISlideRef } from 'common/Slide/typings'
import _newest, { cancelNewest } from 'network/discover/newest'
import LazyLoad from '@/utils/LazyLoad'

function Album() {
  const slideRef = useRef<ISlideRef>(null)
  const [data, setData] = useState<any[][]>([])

  const NavLeft = useMemo(() => (<Link to={ROOT_NAVPATH.ALBUM}>新碟上架</Link>), [])

  useEffect(() => {
    newest()

    function newest() {
      _newest().then((res: any) => {
        try {
          const temp: any[][] = []
          let list: any[] = []
          let count: number = 0
          for (let i = 0; i < 10; i++) {
            ++count;
            list.push(res.albums[i])
            if (count === 5) {
              temp.unshift(list)
              list = []
              count = 0
            }
          }
          setData(temp)
          LazyLoad.update()
        } catch (e) {
          // console.log(e)
        }
      })
    }

    return () => {
      cancelNewest.cancelNewest && cancelNewest.cancelNewest()
    }
  }, [])

  return (
    <div className='album'>
      <Navbar left={NavLeft} right={<NavRight path={ROOT_NAVPATH.ALBUM} />} />
      <div className='disk'>
        <div className='inner'>
          <div className='roll'>
            <Slide ref={slideRef}>
              {
                data.map((list: any[], index) => {
                  return (
                    <ul className='roll-item' key={`roll_item_${index}`}>
                      {
                        list.map(item => {
                          const { id, name, picUrl, artist } = item

                          return (
                            <li className='v-hd2' key={id}>
                              <div className='cover'>
                                <img data-src={picUrl + '?param=100y100'} alt={name} width={100} height={100} />
                                <Link className='hover coverall' title={name} to={`${ALBUM}?id=${id}`}></Link>
                                <i className='play iconall pointer' title='播放'></i>
                              </div>
                              <p className='f-thide'>
                                <Link className='hover' title={name} to={`${ALBUM}?id=${id}`}>{name}</Link>
                              </p>
                              <p className='f-thide' title={artist.name}>
                                <Link className='hover' to={`${ARTIST}?id=${artist.id}`}>{artist.name}</Link>
                              </p>
                            </li>
                          )
                        })
                      }
                    </ul>
                  )
                })
              }
            </Slide>
          </div>
          <span className='btn btn-left v-hd2 pointer' onClick={() => { slideRef.current?.transform(false) }}></span>
          <span className='btn btn-right v-hd2 pointer' onClick={() => { slideRef.current?.transform(true) }}></span>
        </div>
      </div>
    </div>
  )
}

export default Album
