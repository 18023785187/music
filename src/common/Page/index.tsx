/**
 * 翻页器   传入callback用于翻页时触发函数，count为总数，limit为每页最大数，两者用于计算出总页数
 */
import React, { useState, useEffect, useCallback } from 'react'
import styles from './styles/index.module.less'

interface IProps {
  callback: (page: number | string) => void,
  count: number,
  limit: number,
  initPage: number
}

function Page(props: IProps) {
  const { callback, count, limit, initPage } = props
  const [pageCount, setPageCount] = useState<number>(0)
  const [curPage, setCurPage] = useState<number>(initPage)

  useEffect(() => {
    setCurPage(initPage)
    setPageCount(count ? Math.ceil(count / limit) - 1 : 0)
  }, [count, limit, initPage])

  const prevClick = useCallback(() => {
    if (curPage <= 0) {
      callback(0)
      setCurPage(0)
    } else {
      callback(curPage - 1)
      setCurPage(curPage - 1)
    }
  }, [curPage, callback])

  const nextClick = useCallback(() => {
    if (curPage >= pageCount) {
      callback(pageCount)
      setCurPage(pageCount)
    } else {
      callback(curPage + 1)
      setCurPage(curPage + 1)
    }
  }, [curPage, pageCount, callback])

  return (
    <div className={styles.page}>
      <div className='u-page'>
        <div className={`prev button zbtn ${curPage === 0 ? 'disabled d-prev' : 'pointer'}`} onClick={prevClick}>上一页</div>
        {
          function (): JSX.Element[] | JSX.Element {
            if (count === undefined) return <></>

            const jsxElements: JSX.Element[] = []
            let start: number = curPage - 4
            let end: number = curPage + 4
            if (start <= 0) {
              if (pageCount > 7) {
                for (let i = 0; i < 8; i++) {
                  jsxElements.push(<div key={i} className={`zpgi ${curPage === i ? 'selected button' : 'pointer'}`} onClick={() => { callback(i); setCurPage(i) }}>{i + 1}</div>)
                }
                jsxElements.push(<span key='start'>...</span>)
                jsxElements.push(<div key={pageCount} className={`zpgi ${curPage === pageCount ? 'selected button' : 'pointer'}`} onClick={() => { callback(pageCount); setCurPage(pageCount) }}>{pageCount + 1}</div>)
              } else {
                for (let i = 0; i <= pageCount; i++) {
                  jsxElements.push(<div key={i} className={`zpgi ${curPage === i ? 'selected button' : 'pointer'}`} onClick={() => { callback(i); setCurPage(i) }}>{i + 1}</div>)
                }
              }
            } else {
              if (end >= pageCount) {
                if (pageCount > 7) {
                  jsxElements.push(<div key={0} className={`zpgi ${curPage === 0 ? 'selected button' : 'pointer'}`} onClick={() => { callback(0); setCurPage(0) }}>{0 + 1}</div>)
                  jsxElements.push(<span key='start'>...</span>)
                  for (let i = pageCount - 7; i <= pageCount; i++) {
                    jsxElements.push(<div key={i} className={`zpgi ${curPage === i ? 'selected button' : 'pointer'}`} onClick={() => { callback(i); setCurPage(i) }}>{i + 1}</div>)
                  }
                } else {
                  for (let i = 0; i <= pageCount; i++) {
                    jsxElements.push(<div key={i} className={`zpgi ${curPage === i ? 'selected button' : 'pointer'}`} onClick={() => { callback(i); setCurPage(i) }}>{i + 1}</div>)
                  }
                }
              } else {
                jsxElements.push(<div key={0} className={`zpgi ${curPage === 0 ? 'selected button' : 'pointer'}`} onClick={() => { callback(0); setCurPage(0) }}>{0 + 1}</div>)
                jsxElements.push(<span key='start'>...</span>)
                for (let i = start + 1; i < end; i++) {
                  jsxElements.push(<div key={i} className={`zpgi ${curPage === i ? 'selected button' : 'pointer'}`} onClick={() => { callback(i); setCurPage(i) }}>{i + 1}</div>)
                }
                jsxElements.push(<span key='end'>...</span>)
                jsxElements.push(<div key={pageCount} className={`zpgi ${curPage === pageCount ? 'selected button' : 'pointer'}`} onClick={() => { callback(pageCount); setCurPage(pageCount) }}>{pageCount + 1}</div>)
              }
            }
            return jsxElements
          }()
        }
        <div className={`next button zbtn ${curPage === pageCount ? 'disabled d-next' : 'pointer'}`} onClick={nextClick}>下一页</div>
      </div>
    </div>
  )
}

export default Page
