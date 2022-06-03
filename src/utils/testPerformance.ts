/**
 * 简单测试性能指标
 */
console.log(window.performance)

function testPerformance() {
  const performanceTiming = window.performance.timing
  const memory = (window.performance as any).memory

  const {
    domainLookupEnd,
    domainLookupStart,
    connectEnd,
    connectStart,
    responseEnd,
    responseStart,
    domComplete,
    domInteractive,
    domLoading,
    fetchStart,
    domContentLoadedEventEnd,
    loadEventEnd
  } = performanceTiming

  const { totalJSHeapSize, usedJSHeapSize } = memory
  // DNS查询耗时
  const dnsTime = (domainLookupEnd - domainLookupStart) / 1000
  // TCP连接耗时
  const tcpTime = (connectEnd - connectStart) / 1000
  // 请求耗时
  const requestTime = (responseEnd - responseStart) / 1000
  // 解析DOM耗时
  const completeDOMTime = (domComplete - domInteractive) / 1000
  // 白屏时间
  const loadingTime = (domLoading - fetchStart) / 1000
  // DOM渲染时间
  const domReadyTime = (domContentLoadedEventEnd - fetchStart) / 1000
  // onload时间
  const onloadTime = (loadEventEnd - fetchStart) / 1000

  console.log(`%c
     DNS查询耗时: ${dnsTime}s,                                                                                                                                                                                   
     TCP连接耗时: ${tcpTime}s,                                                                                                                                                                                  
     请求耗时: ${requestTime}s,                                                                                                                                                                                                                  
     解析DOM耗时: ${completeDOMTime}s,                                                                                                                                                                             
     白屏时间: ${loadingTime}s,                                                                                                                                                                 
     DOM渲染时间: ${domReadyTime}s,                                                                                                                                                                                    
     onload时间: ${onloadTime}s,                                                                                                                                                              
     当前占用js堆栈内存: ${usedJSHeapSize}                                                                                                                                                           
     总js堆栈内存: ${totalJSHeapSize},                                                                                                                                      
     js堆栈内存占用率: ${Math.round((usedJSHeapSize / totalJSHeapSize) * 100)}%                                                                                                                                              `
    ,
    // 样式
    `
       display: block;
       background-color: rgb(40,44,52);
       color: rgb(229,192,123);
       font-size: 16px;
     `)
}


export default testPerformance
