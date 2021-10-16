/**
 * 
 */

interface IVideoPlayerProps {
    isMv?: boolean,
    id?: number | string,
    duration?: number,
    name?: string,
    artistName?: string,
    brs?: {
        size: number,
        br: number
    }[]
}

interface ICtrlRef {
    flagCallback: (flag: boolean) => void
}

export type {
    IVideoPlayerProps,
    ICtrlRef
}
