/**
 * 所有榜单，榜单详情等
 */
interface IToplistState {
  toplist: Array<{}>,
  playlistDetail: {
    [propName: string]: any
  }
}

const toplistState: IToplistState = {
  toplist: [],
  playlistDetail: {}
}

export default toplistState
export type { IToplistState }
