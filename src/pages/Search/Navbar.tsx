/**
 * 导航
 */
import React, { useMemo, useCallback } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import { SEATCH } from 'pages/path'
import { list } from './constant'

interface IProps extends RouteComponentProps { }

function Navbar(props: IProps) {
  const { location, history } = props
  const { search: s } = location
  const parse = useMemo(() => qs.parse(s.substring(1)), [s])

  const changeType = useCallback((type: string) => {
    const { s, type: t } = parse
    if (type !== t) {
      history.push(SEATCH + `?s=${s}&type=${type}`)
    }
  }, [parse, history])

  return (
    <ul className='navbar tab'>
      {
        list.map((item, index) => {
          const { name, type } = item

          return (
            <li className={`${parse.type === type ? 'high' : ''} ${index === 0 ? 'fst' : ''}`} key={name} onClick={() => { changeType(type) }}>
              <span className='tab'>
                <em className='tab'>{name}</em>
              </span>
            </li>
          )
        })
      }
    </ul>
  )
}

export default withRouter(Navbar)
