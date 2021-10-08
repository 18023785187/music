/**
 * 顶部导航栏
 */
import React, { useState, useMemo, useCallback, useRef, FormEvent, KeyboardEvent } from 'react'
import { Link, NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import { nav, rootNav, NAVPATH, ROOT_NAVPATH } from './typings'
import PubSub, { CLOSE } from '@/PubSub'
import SearchSuggest from 'common/SearchSuggest'
import styles from './styles/index.module.less'
import { cancelSearch } from 'network/search'
import { SEATCH } from '@/pages/path'

interface IProps extends RouteComponentProps {

}

function Top(props: IProps) {
    // 路由
    const { location, history } = props
    // 搜索框相关处理
    const [search, setSearch] = useState<boolean>(true)
    const [searchShow, setSearchShow] = useState<boolean>(false)
    // 搜索框输入文本
    const [searchValue, setSearchValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    // 显示登录弹窗
    const showLoginClick = useCallback(() => {
        PubSub.publish(CLOSE.LOGIN, false)
    }, [])

    const navPathList: NAVPATH[] = useMemo(() => {
        return Object.values(NAVPATH).filter(path => path !== NAVPATH.ROOT && path !== NAVPATH.NULL)
    }, [])

    const showRootNav: boolean = useMemo(() => {
        return !navPathList.includes(location.pathname as NAVPATH)
    }, [location.pathname, navPathList])

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
        if ((e.key === "Enter") && searchValue !== '') {
            cancelSearch.cancelSearchSuggest && cancelSearch.cancelSearchSuggest();

            history.push(SEATCH + `?s=${searchValue}&type=1`);

            (e.target as HTMLInputElement).blur()
        }
    }, [history, searchValue])

    return (
        <div className={styles.top}>
            <div className='top-box'>
                <div className='top-content'>
                    <div className='top-left'>
                        <h1 className="logo top pointer"><Link to={NAVPATH.ROOT}>网易云音乐</Link></h1>
                        <ul className='top-nav'>
                            {
                                nav.map(item => {
                                    const { name, link, path } = item
                                    let pathTar: boolean
                                    if (path === NAVPATH.ROOT) {
                                        pathTar = showRootNav
                                    } else {
                                        pathTar = location.pathname === path
                                    }

                                    return (
                                        <li key={name} className={`top-nav-item ${path === NAVPATH.DOWNLOAD ? 'lst' : ''}`}>
                                            {
                                                !link
                                                    ?
                                                    <div className={pathTar ? 'high' : ''}>
                                                        <NavLink exact to={path} className={pathTar ? 'high' : ''}>
                                                            {name}
                                                            <sub className='cor top' style={{ display: pathTar ? 'block' : 'none' }}></sub>
                                                            <sub className={`top ${path === NAVPATH.DOWNLOAD ? 'hot' : ''}`}></sub>
                                                        </NavLink>
                                                    </div>
                                                    :
                                                    <a href={link} target="_blank" rel="noreferrer">{name}</a>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='top-right'>
                        <div className='top-login'>
                            <span className='login pointer hover' onClick={showLoginClick}>登录</span>
                            {/* 这里还需要写个人信息框 */}
                        </div>
                        <a className='topvd' href="https://music.163.com/#/login?targetUrl=%2Fcreatorcenter" target="_blank" rel="noreferrer">创作者中心</a>
                        <div className='top-search'>
                            <div className='top-search-bg top'>
                                <div className='input'>
                                    <input type="text" ref={inputRef} onBlur={() => { if (searchValue === '') { setSearch(true) }; setSearchShow(false); }} onChange={searchChange} onClick={() => setSearchShow(true)} onKeyDown={searchKeyDown} />
                                    <label className="ph" style={{ display: search ? 'block' : 'none' }} onClick={() => { inputRef.current?.focus(); setSearch(false); }}>音乐/视频/电台/用户</label>
                                </div>
                            </div>
                            {/* 这里还需要写一个搜索结果框 */}
                            <div style={{ display: searchShow ? 'block' : 'none' }}>
                                <SearchSuggest value={searchValue} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='m-subnav m-subnav-up' style={{ display: !showRootNav ? 'block' : 'none' }}></div>
            <div className='m-subnav' style={{ display: showRootNav ? 'block' : 'none' }}>
                <div className='wrap'>
                    <ul className='nav'>
                        {
                            rootNav.map(item => {
                                const { name, path } = item

                                return (
                                    <li key={name}>
                                        <NavLink to={path}>
                                            <em className={
                                                path === location.pathname ||
                                                    (location.pathname.indexOf(path) === 0 && path !== ROOT_NAVPATH.DISCOVER) ||
                                                    (location.pathname === NAVPATH.ROOT && path === ROOT_NAVPATH.DISCOVER)
                                                    ? 'em-high' : ''}>{name}
                                                {/* 图片展占位 */}
                                                {/* <img src={icon} className='r' alt='R'></img> */}
                                            </em>
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default withRouter(Top)
