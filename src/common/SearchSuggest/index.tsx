/**
 * 搜索建议框组件
 */
import React, { useState, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { SEATCH } from 'pages/path'
import { searchSuggest, cancelSearch } from 'network/search'
import styles from './styles/index.module.less'

interface IProps extends RouteComponentProps {
  value: string
}

const list = [
  {
    title: '单曲',
    className: 'icon1 u-icn u-icn26'
  },
  {
    title: '歌手',
    className: 'icon1 u-icn u-icn27'
  },
  {
    title: '专辑',
    className: 'icon1 u-icn u-icn28'
  },
  {
    title: '歌单',
    className: 'icon1 u-icn u-icn29'
  }
]

function SearchSuggest(props: IProps) {
  const { value, history } = props
  const [data, setData] = useState<{ [propName: string]: any } | null>(null)

  useEffect(() => {
    if (value !== '') {
      searchSuggest(value).then((res: any) => {
        try {
          if (Object.keys(res.result).length) {
            setData(res.result)
          }
        } catch (e) {
          setData(null)
        }
      })
    }

    return () => {
      cancelSearch.cancelSearchSuggest && cancelSearch.cancelSearchSuggest()
    }
  }, [value])

  return data ? (
    <div className={`${styles['search-suggest']} u-lstlay`} >
      <p className='note s-fc3'>
        <span className='search-user s-fc3 pointer' onMouseDown={() => history.push(SEATCH + `?s=${value}&type=1002`)}>搜“{value}” 相关用户</span>
        &nbsp;&gt;
      </p>
      {
        list.map((item, index) => data[data.order[index]] ? (
          <div key={item.title} className='item'>
            <h3 className='hd'>
              <i className={item.className}></i>
              <em>{item.title}</em>
            </h3>
            <ul className={index % 2 === 0 ? '' : 'odd'}>
              {
                data[data.order[index]].map((item: any) => {
                  const { id, name, artist, artists } = item
                  let userName: string = ''
                  if (artist) userName = artist.name
                  if (artists) userName = artists.map((artist: any) => artist.name).join(' ')

                  return (
                    <li key={id} className='f-thide'>
                      <span className='item s-fc0 f-thide pointer' onMouseDown={() => history.push('/' + data.order[index].slice(0, -1) + `?id=${id}`)}>
                        <span dangerouslySetInnerHTML={{ __html: name.replace(new RegExp(value, 'g'), `<span class='s-fc7'>${value}</span>`) }}></span>
                        {userName ? <span dangerouslySetInnerHTML={{ __html: `-${userName.replace(new RegExp(value, 'g'), `<span class='s-fc7'>${value}</span>`)}` }}></span> : ''}
                      </span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        ) : '')
      }
    </div>
  ) : <></>
}

export default withRouter(SearchSuggest)
