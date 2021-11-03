/**
 * 头部
 */
import React, { useState, useEffect, useMemo, memo } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import _getDynamic, { cancelGetDynamic } from 'network/playlist/getDynamic'
import Buttons from 'common/Buttons'
import { formatDate } from 'utils'

interface IProps extends RouteComponentProps {
    toplistData: { [propName: string]: any }[]
}

function Header(props: IProps) {
    const { toplistData, location } = props
    const { search } = location
    const parse = useMemo(() => qs.parse(search.substring(1)), [search])
    const [idx, setIdx] = useState<number>(0)
    const [dynamic, setDynamic] = useState<{ [propName: string]: any }>({})

    useEffect(() => {
        const { id: curId } = parse

        if (curId != null) {
            for (let i = 0; i < toplistData.length; i++) {
                const { id } = toplistData[i]

                if (id.toString() === curId.toString()) {
                    setIdx(i)
                    break
                }
            }
        }
    }, [toplistData, parse])

    useEffect(() => {
        let { id } = parse
        if (toplistData.length) {
            if (id === undefined) id = toplistData[idx].id
            getDynamic()

        }

        async function getDynamic() {
            const res: any = await _getDynamic(id as string)
            try {
                if (res.code === 200) {
                    window.scrollTo(0, 0)
                    setDynamic(res)
                }
            } catch (e) {

            }
        }

        return () => {
            cancelGetDynamic.cancelGetDynamic && cancelGetDynamic.cancelGetDynamic()
        }
    }, [toplistData, parse, idx])

    const { coverImgUrl, name, updateFrequency, updateTime } = toplistData[idx] || {}

    return (
        <>
        {/* 头部 */}
            <div className='cover'>
                <img src={coverImgUrl + '?param=150y150'} alt={name} width={150} height={150} />
                <span className='msk coverall'></span>
            </div>
            <div className='cnt'>
                <div className='hd'>
                    <h2 className='f-ff2'>{name}</h2>
                </div>
                <div className='user'>
                    <i className='i icon1 u-icn-57 u-icn2'></i>
                    <span className='s-fc3 sep'>最近更新：{formatDate(new Date(updateTime), 'MM月dd日')}</span>
                    <span className='s-fc4'>（{updateFrequency}）</span>
                </div>
                <Buttons dynamic={dynamic} playFunc={() => {}} addFunc={() => {}} />
            </div>
        </>
    )
}

export default memo(withRouter(Header))
