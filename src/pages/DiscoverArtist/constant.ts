/**
 * 左侧数据
 */
import { ROOT_ARTIST } from 'pages/path'

const blk: {
  title: string;
  list: {
    name: string;
    path: string;
    params: [number, number, number];
  }[];
}[] = [
    {
      title: '推荐',
      list: [
        {
          name: '推荐歌手',
          path: ROOT_ARTIST.SIGNED + '',
          params: [100, -1, -1]
        }
      ]
    },
    {
      title: '华语',
      list: [
        {
          name: '华语男歌手',
          path: ROOT_ARTIST.CAT + '?id=1001',
          params: [100, 1, 7]
        },
        {
          name: '华语女歌手',
          path: ROOT_ARTIST.CAT + '?id=1002',
          params: [100, 2, 7]
        },
        {
          name: '华语组合/乐队',
          path: ROOT_ARTIST.CAT + '?id=1003',
          params: [100, 3, 7]
        },
      ]
    },
    {
      title: '欧美',
      list: [
        {
          name: '欧美男歌手',
          path: ROOT_ARTIST.CAT + '?id=2001',
          params: [100, 1, 96]
        },
        {
          name: '欧美女歌手',
          path: ROOT_ARTIST.CAT + '?id=2002',
          params: [100, 2, 96]
        },
        {
          name: '欧美组合/乐队',
          path: ROOT_ARTIST.CAT + '?id=2003',
          params: [100, 3, 96]
        },
      ]
    },
    {
      title: '日本',
      list: [
        {
          name: '日本男歌手',
          path: ROOT_ARTIST.CAT + '?id=6001',
          params: [100, 1, 8]
        },
        {
          name: '日本女歌手',
          path: ROOT_ARTIST.CAT + '?id=6002',
          params: [100, 2, 8]
        },
        {
          name: '日本组合/乐队',
          path: ROOT_ARTIST.CAT + '?id=6003',
          params: [100, 3, 8]
        }
      ]
    },
    {
      title: '韩国',
      list: [
        {
          name: '韩国男歌手',
          path: ROOT_ARTIST.CAT + '?id=7001',
          params: [100, 1, 16]
        },
        {
          name: '韩国女歌手',
          path: ROOT_ARTIST.CAT + '?id=7002',
          params: [100, 2, 16]
        },
        {
          name: '韩国组合/乐队',
          path: ROOT_ARTIST.CAT + '?id=7003',
          params: [100, 3, 16]
        }
      ]
    },
    {
      title: '其他',
      list: [
        {
          name: '其他男歌手',
          path: ROOT_ARTIST.CAT + '?id=4001',
          params: [100, 1, 0]
        },
        {
          name: '其他女歌手',
          path: ROOT_ARTIST.CAT + '?id=4002',
          params: [100, 2, 0]
        },
        {
          name: '其他组合/乐队',
          path: ROOT_ARTIST.CAT + '?id=4003',
          params: [100, 3, 0]
        }
      ]
    }
  ]

const str: string[] = []
for (let i = 65; i < 91; i++) {
  str.push(String.fromCharCode(i))
}
// 字母分类列表
const initial = ['-1', ...str, '0']

export {
  blk,
  initial
}
