/**
 * 预加载器
 */
type url = string
const set: Set<url> = new Set()

/**
 * @param url 
 */
function preload(url: url): void {
    if (set.has(url)) return
    const img = new Image()
    img.src = url
}

export default preload
