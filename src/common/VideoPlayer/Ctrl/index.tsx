/**
 * 控制器
 */
import React from 'react'

function Ctrl() {

    return (
        <div className='controls'>
            <div className='wrap'>
                <div className='foh'>
                    {/* 播放按钮 */}
                    <div className='left'>
                        <i className='play pointer'></i>
                        <span className='time'>00:00</span>
                    </div>
                    {/* 进度条 */}
                    <div className='progresswrap'>
                        <div className='progress progress-2'></div>
                    </div>
                </div>
                {/* 进度条右边 */}
                <div className='right'>
                    <div className='duration'>00:00</div>
                    <div className='volume'>
                        <i className='mute pointer'></i>
                    </div>
                    <div className='brs'></div>
                    <i className='full pointer'></i>
                </div>
            </div>
        </div>
    )
}

export default Ctrl
