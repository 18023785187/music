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
  setBufferTime?: React.Dispatch<React.SetStateAction<number>>,
  setIsPlay?: React.Dispatch<React.SetStateAction<boolean>>,
  setAddShow?: React.Dispatch<React.SetStateAction<boolean>>,
  setLyricMap?: React.Dispatch<React.SetStateAction<{
    [propName: string]: any;
  }>>,
}

const setState: ISetState = {
  setPlaylist: undefined,
  setCurPos: undefined,
  setCurTime: undefined,
  setBufferTime: undefined,
  setIsPlay: undefined,
  setAddShow: undefined,
  setLyricMap: undefined
}

export default setState
