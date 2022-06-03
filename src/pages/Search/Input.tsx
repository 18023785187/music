/**
 * 搜索框
 */
import React, { useState, useCallback, useRef, FormEvent, KeyboardEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import SearchSuggest from 'common/SearchSuggest'
import { cancelSearch } from 'network/search'
import { SEATCH } from 'pages/path'
import { escapeSymbol } from 'utils'

interface IProps extends RouteComponentProps { }

function Input(props: IProps) {
  const { history } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchShow, setSearchShow] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')

  // 搜索框输入
  const searchChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).value !== '') {
      setSearchShow(true)
    } else {
      setSearchShow(false)
    }
    setSearchValue((e.target as HTMLInputElement).value)
  }, [])

  const emit = useCallback(() => {
    if (searchValue !== '') {
      cancelSearch.cancelSearchSuggest && cancelSearch.cancelSearchSuggest();

      history.push(SEATCH + `?s=${escapeSymbol(searchValue)}&type=1`);

      inputRef.current?.blur()
    }
  }, [history, searchValue])

  const searchKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()

    if (e.key === "Enter") {
      emit()
    }
  }, [emit])

  return (
    <div className='pgsrch sprite'>
      <input ref={inputRef} className='search-input' type="text" onBlur={() => { setSearchShow(false) }} onFocus={() => { setSearchShow(true) }} onChange={searchChange} onKeyDown={searchKeyDown} />
      <div className='btn sprite pointer' title='搜索' onClick={emit}>搜索</div>
      <div style={{ display: searchShow ? 'block' : 'none' }}>
        <SearchSuggest value={searchValue} />
      </div>
    </div>
  )
}

export default withRouter(Input)
