/**
 * 歌手mv
 */
import React, { useEffect, memo } from 'react'
import { getArtistMv, cancelArtist } from 'network/artist'

interface IProps {
    id: string
}

function Mv(props: IProps) {
    const { id } = props

    useEffect(() => {
        getArtistMv(id).then(res => {

        }).catch(rej => {

        })

        return () => {
            cancelArtist.cancelGetArtistMv && cancelArtist.cancelGetArtistMv()
        }
    }, [id])

    return (
        <div></div>
    )
}

export default memo(Mv)
