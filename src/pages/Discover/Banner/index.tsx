/**
 * 轮播图组件
 */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import _getBanner, { cancelgetBanner } from 'network/discover/banner'
import { NAVPATH, ALBUM } from 'pages/path'
import { preload } from 'utils'

type bannerInfo = { url: string, id: string, scm: string }

function Banner() {
    // 轮播图
    const [banners, setBanners] = useState<bannerInfo[]>([])
    // 当前轮播项
    const [idx, setIdx] = useState<number>(0)

    // 定时器
    const timerRef = useRef<number | null>(null)
    const timerOut1Ref = useRef<number | null>(null)
    const timerOut2Ref = useRef<number | null>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        // 发请求
        getBanner()

        function getBanner() {
            _getBanner().then((res: any) => {
                try {
                    const b = res.banners.map((item: any) => ({ url: item.imageUrl, id: item.encodeId, scm: item.scm }))
                    b.forEach((item: bannerInfo) => {
                        preload(item.url)
                    })
                    setBanners(b)
                } catch (e) {
                    // getBanner()
                    // console.log(e)
                }
            })
        }

        return () => {
            cancelgetBanner.cancelgetBanner && cancelgetBanner.cancelgetBanner()
        }
    }, [])

    useEffect(() => {
        if(banners.length){
            run()
        }

        return () => {
            stop()
            window.clearInterval(timerOut1Ref.current as number)
            window.clearInterval(timerOut2Ref.current as number)
        }
    })

    // 改变轮播图位置
    const changeIdx = useCallback(function (isNext: boolean = true) {
        const len = banners.length - 1
        const curIdx = isNext ? idx + 1 : idx - 1

        if (curIdx < 0) {
            setIdx(banners.length - 1)
        } else if (curIdx > len) {
            setIdx(0)
        } else {
            setIdx(curIdx)
        }
    }, [banners.length, idx])

    // 跑轮播图
    const run = useCallback(function () {
        timerRef.current = window.setInterval(() => {
            if (imgRef.current) {
                imgRef.current.style.transition = 'opacity 1s ease-in 0s'
                imgRef.current.style.opacity = '0.2'
                timerOut1Ref.current = window.setTimeout(() => {
                    changeIdx()

                    imgRef.current!.style.transition = 'opacity 1s ease-out 0s'
                    imgRef.current!.style.opacity = '1'
                    timerOut2Ref.current = window.setTimeout(() => {
                        imgRef.current!.style.transition = 'none 0s ease 0s'
                    }, 1000)
                }, 1000)
            }
        }, 4000)
    }, [changeIdx])

    // 停止轮播图
    const stop = useCallback(function () {
        window.clearInterval(timerRef.current as number)
    }, [])

    return (
        <div className='banner' onMouseMove={stop} onMouseOut={run}>
            <div className='banner-bg' style={{ background: `url(${banners[idx]?.url}) no-repeat` }}>
                <div className='w banner-box'>
                    <div className='banner-content'>
                        <Link to={ALBUM + '/' + banners[idx]?.id}>
                            <img ref={imgRef} src={banners[idx]?.url} alt={banners[idx]?.id} width={730} height={285} />
                        </Link>
                        <div className='dots'>
                            {/* 轮播点 */}
                            {
                                banners.map((item, index) => {
                                    return (
                                        <div
                                            className={`btn-img dots-item pointer ${idx === index ? 'dots-high' : ''}`}
                                            key={item.scm}
                                            onClick={() => { setIdx(index) }}></div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='b-download'>
                        <div className='img download'>
                            <Link className='download' to={NAVPATH.DOWNLOAD}>下载客户端</Link>
                            <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                        </div>
                    </div>
                    <div className='btn btn-left btn-img pointer' onClick={(e) => { e.stopPropagation(); imgRef.current!.style.transition = 'none 0s ease 0s'; changeIdx(false) }} onMouseMove={stop}></div>
                    <div className='btn btn-right btn-img pointer' onClick={(e) => { e.stopPropagation(); imgRef.current!.style.transition = 'none 0s ease 0s'; changeIdx() }} onMouseMove={stop}></div>
                </div>
            </div>
        </div>
    )
}

export default Banner
