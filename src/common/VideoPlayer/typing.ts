/**
 * 
 */

interface IVideoPlayerProps {
  setBr?: (br: number) => void,
  isMv?: boolean,
  id?: number | string,
  cover?: string,
  duration?: number,
  name?: string,
  artistName?: string,
  brs?: {
    size: number,
    br: number
  }[]
}

interface ICtrlRef {
  flagCallback: (flag: boolean) => void,
  ctrlShowFlag: (flag: boolean) => void
}

export type {
  IVideoPlayerProps,
  ICtrlRef
}
