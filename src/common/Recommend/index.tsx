/**
 * 热门推荐
 */
import React from 'react'
import Item from './Item'
import styles from './styles/index.module.less'

interface IProps {
  recommends: []
}

function Recommend(props: IProps) {
  const { recommends } = props

  return (
    <div className={styles['recommend']}>
      {/* 展示区 */}
      <ul className='recommend-list'>
        {
          recommends.map((item: any) => {
            return <Item key={item.id} {...item} />
          })
        }
      </ul>
    </div>
  )
}

export default Recommend
