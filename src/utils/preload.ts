/**
 * 预加载器
 */
type url = string
const set: Set<url> = new Set()
const queue: url[] = []

const img = new Image()
img.onload = function () {
  if (queue.length) {
    const url = queue.shift()
    img.src = url!
  }
}

function preloadPush(arr: string[], url: string) {
  if (arr.length) {

  } else {
    img.src = url
  }
  arr.push(url)
}

/**
 * @param url 
 */
function addPreload(url: url): void {
  if (url) {
    if (set.has(url)) return

    set.add(url)
    preloadPush(queue, url)
  }
}

export default addPreload
