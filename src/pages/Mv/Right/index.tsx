/**
 * mv右边
 */
import React, { useState, useEffect } from 'react'
import MvAbout from 'common/MvAbout'
import { related } from '@/network/video'

interface IProps {
    data: { [propName: string]: any }
}

function Right(props: IProps) {
    const { data } = props
    const { publishTime, playCount, briefDesc, desc, id } = data

    const [mvs, setMvs] = useState<{ [propName: string]: any }[]>([])
    console.log(mvs)

    useEffect(() => {
        id && related(id).then((res: any) => {
            try {
                setMvs(res.data)
            } catch (e) {

            }
        })

    }, [data, id])

    return (
        <div className='g-sd4'>
            <div className='g-wrap7'>
                {/* 简介 */}
                <h3 className="u-hd3">
                    <span>MV简介</span>
                </h3>
                <div className='m-mvintr'>
                    <p className="s-fc4">发布时间：{publishTime}</p>
                    <p className="s-fc4">播放次数：{playCount > 10000 ? Math.floor((playCount / 10000)) + '万' : playCount}次</p>
                    <p className='intr'>
                        {briefDesc}<br />{desc}
                    </p>
                </div>
                {/* 推荐 */}
                <h3 className="u-hd3">
                    <span>相关推荐</span>
                </h3>
                {/*  */}
                <MvAbout />
            </div>
        </div>
    )
}

export default Right
