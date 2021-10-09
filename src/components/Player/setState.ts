/**
 * setState集合
 */
import React from 'react'

interface ISetState {
    setPlaylist?: React.Dispatch<React.SetStateAction<{
        [propName: string]: any;
    }[]>>,
    setCurPos?: React.Dispatch<React.SetStateAction<number>>
}

const setState: ISetState = {
    setPlaylist: undefined,
    setCurPos: undefined
}

export default setState
