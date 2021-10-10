/**
 * 控制器
 */
// import React, { useState } from 'react'
// import wLocalStoreage, { PLAY_MODE } from '@/localStorage'

function Ctrl() {
    // const [state, setState] = useState<number>()

    return (
        <div className='ctrl playbar-img'>
            <i className='playbar-img icn-vol icn pointer'></i>
            <i className='playbar-img icn-one icn pointer' title="单曲循环">单曲循环</i>
        </div>
    )
}

export default Ctrl
