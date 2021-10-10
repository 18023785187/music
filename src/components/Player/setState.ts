/**
 * setState集合
 */
import React from 'react'

interface ISetState {
    setPlaylist?: React.Dispatch<React.SetStateAction<{
        [propName: string]: any;
    }[]>>,
    setCurPos?: React.Dispatch<React.SetStateAction<number>>,
    setCurTime?: React.Dispatch<React.SetStateAction<number>>,
    setIsPlay?: React.Dispatch<React.SetStateAction<boolean>>
}

const setState: ISetState = {
    setPlaylist: undefined,
    setCurPos: undefined,
    setCurTime: undefined,
    setIsPlay: undefined
}

export default setState
