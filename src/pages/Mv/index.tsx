/**
 * mv
 */
import React, { useState, useEffect, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import { getMvDetail, cancelMv } from '@/network/video'
import Left from './Left'
import Right from './Right'
import styles from './styles/index.module.less'

interface IProps extends RouteComponentProps { }

function Mv(props: IProps) {
  const { location } = props
  const { search } = location
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])

  // mv详情
  const [data, setData] = useState<{ [propName: string]: any }>({})

  useEffect(() => {
    let { id } = parse

    getMvDetail(id as string).then(res => {
      try {
        setData(res.data)
      } catch (e) {

      }
    })

    return () => {
      cancelMv.cancelGetMvDetail && cancelMv.cancelGetMvDetail()
    }
  }, [parse])

  return (
    <div className={`${styles['mv']} g-bd`}>
      {/* 左 */}
      <Left data={data} />
      {/* 右 */}
      <Right data={data} />
    </div>
  )
}

export default Mv
