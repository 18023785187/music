/**
 * 顶部右边
 */
import React, { useState, useCallback, useRef, FormEvent, KeyboardEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import User from './User'
import SearchSuggest from 'common/SearchSuggest'
import { cancelSearch } from 'network/search'
import { SEATCH } from '@/pages/path'
import { escapeSymbol } from 'utils'

interface IProps extends RouteComponentProps { }

function Right(props: IProps) {
  // 路由
  const { history } = props
  // 搜索框相关处理
  const [search, setSearch] = useState<boolean>(true)
  const [searchShow, setSearchShow] = useState<boolean>(false)
  // 搜索框输入文本
  const [searchValue, setSearchValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // 搜索框输入
  const searchChange = useCallback((e: FormEvent<HTMLInputElement>) => {

    if ((e.target as HTMLInputElement).value !== '') {
      setSearchShow(true)
    } else {
      setSearchShow(false)
    }
    setSearchValue((e.target as HTMLInputElement).value)
  }, [])
  const searchKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()

    if ((e.key === "Enter") && searchValue !== '') {
      cancelSearch.cancelSearchSuggest && cancelSearch.cancelSearchSuggest();

      history.push(SEATCH + `?s=${escapeSymbol(searchValue)}&type=1`);

      (e.target as HTMLInputElement).blur()
    }
  }, [history, searchValue])

  return (
    <div className='top-right'>
      {/* 登录与个人信息操作入口 */}
      <User />
      {/* 创作者中心 */}
      <a
        className='topvd'
        href="https://music.163.com/#/login?targetUrl=%2Fcreatorcenter"
        target="_blank"
        rel="noreferrer">创作者中心</a>
      {/* 搜索框 */}
      <div className='top-search'>
        <div className='top-search-bg top'>
          <div className='input'>
            <input
              type="text"
              ref={inputRef}
              onBlur={() => { if (searchValue === '') { setSearch(true) }; setSearchShow(false); }}
              onChange={searchChange}
              onClick={() => setSearchShow(true)}
              onKeyDown={searchKeyDown} />
            <label
              className="ph"
              style={{ display: search ? 'block' : 'none' }}
              onClick={() => { inputRef.current?.focus(); setSearch(false); }}
            >音乐/视频/电台/用户</label>
          </div>
        </div>
        {/* 搜索结果框 */}
        <div style={{ display: searchShow ? 'block' : 'none' }}>
          <SearchSuggest value={searchValue} />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Right)
