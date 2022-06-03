/**
 * 过滤类型，返回地址
 */
import {
  ALBUM,
  ARTIST,
  SONG,
  MV,
  VIDEO,
  NOT_FOUND
} from 'pages/path'

function fiflterType(type: number): string {
  switch (type) {
    case 1:
      return SONG
    case 100:
      return ARTIST
    case 10:
      return ALBUM
    case 1014:
      return VIDEO
    case 1004:
      return MV
    default:
      return NOT_FOUND
  }
}

export default fiflterType