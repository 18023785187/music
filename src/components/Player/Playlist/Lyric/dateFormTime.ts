/**
 * 把分钟变秒钟 传入格式： xx:xx.xx
 */

function dateFormTime(date: string): number {
  if (date === '') return -1

  let time: number = 0

  const dateSplitPoint = date.split('.')

  // 纯分钟
  date = dateSplitPoint[0]
  const point = dateSplitPoint[1]

  const split = date.split(':')
  // 分
  const m = split[0]
  // 秒
  const s = split[1]

  let count: number = 2
  for (let i = 0; i < point.length; i++) {
    time += Number(point[i] + '0'.repeat(count))
    count -= 1
    if (count === -1) break
  }

  for (let i = 0; i < s.length; i++) {
    time += i === 0 ? Number(s[i]) * 10000 : Number(s[i]) * 1000
  }

  for (let i = 0; i < m.length; i++) {
    time += i === 0 ? Number(m[i]) * 60000 : Number(m[i]) * 6000
  }

  return Math.round(time / 1000)
}

export default dateFormTime
