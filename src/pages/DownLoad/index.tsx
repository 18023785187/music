/**
 * 下载页
 */
import React, { useEffect } from 'react'
import pcImg from 'assets/img/download/pc.png'
import phoneImg from 'assets/img/download/phone.png'
import p1music from 'assets/img/download/p1music.jpg'
import p2music from 'assets/img/download/p2music.jpg'
import p3music from 'assets/img/download/p3music.jpg'
import p4music from 'assets/img/download/p4music.jpg'
import p5music from 'assets/img/download/p5music.jpg'
import downloadQr from 'assets/img/download/download.png'
import LazyLoad from '@/utils/LazyLoad'
import styles from './styles/index.module.less'

function DownLoad() {

  useEffect(() => {
    LazyLoad.update()
  }, [])

  return (
    <div className={`${styles['download']} download-bg`}>
      <div className='qrcode'>
        <img src={downloadQr} alt="移动端下载" />
        <p>扫描二维码下载</p>
      </div>
      <div className='clients pointer'>
        <i></i>
        其他操作系统客户端
      </div>
      <div className='download-wrap'>
        <div className='download-main'>
          <div className='pc'>
            <div className='title'>在电脑上听</div>
            <img src={pcImg} alt="在电脑上听" />
            <div className='main-type'>
              <span>
                <i className='main-icon mac' style={{ width: '154px' }}></i>
              </span>
              <span>
                <i className='main-icon windows' style={{ width: '140px' }}></i>
              </span>
            </div>
            <div className='main-btn pointer'>下载电脑端</div>
          </div>
          <div className='phone'>
            <div className='title'>在手机上听</div>
            <img src={phoneImg} alt="在手机上听" />
            <div className='main-type'>
              <span>
                <i className='main-icon iphone' style={{ width: '120px' }}></i>
              </span>
              <span>
                <i className='main-icon android' style={{ width: '120px' }}></i>
              </span>
            </div>
            <div className='main-btn pointer'>
              <i></i>
              下载手机端
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='dcnt'>
          <div className='download-wrap'>
            <div className='w pt1'>
              <div className='lt'>
                <h3 className='tit f-ff2'>千万曲库  首首CD音质</h3>
                <p className='txt f-ff2'>
                  囊括百万无损SQ音乐，你在用手机听歌时，
                  <br />
                  也能感受到纤毫毕现的CD音质，更能免费离线收听
                </p>
              </div>
              <div className='rt'>
                <img data-src={p1music} alt='千万曲库  首首CD音质' />
              </div>
            </div>
          </div>
        </div>
        <div className='dcnt dcnt2'>
          <div className='download-wrap'>
            <div className='w pt2'>
              <div className='lt'>
                <img data-src={p2music} alt='千位明星  亲自推荐音乐' />
              </div>
              <div className='rt'>
                <h3 className='tit f-ff2'>千位明星  亲自推荐音乐</h3>
                <p className='txt f-ff2'>
                  韩红，戴佩妮等
                  <em>千位明星已入驻</em>
                  ，亲自创建私房歌单，录制独
                  <br />
                  家DJ节目，推荐他们心中的好音乐
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='dcnt'>
          <div className='download-wrap'>
            <div className='w pt3'>
              <div className='lt'>
                <h3 className='tit f-ff2'>社交关系  发现全新音乐</h3>
                <p className='txt f-ff2'>
                  你可以
                  <em>关注明星</em>
                  、DJ和好友，通过浏览他们的动态、收藏和
                  <br />
                  分享，发现更多全新好音乐
                </p>
              </div>
              <div className='rt'>
                <img data-src={p3music} alt='社交关系  发现全新音乐' />
              </div>
            </div>
          </div>
        </div>
        <div className='dcnt dcnt2'>
          <div className='download-wrap'>
            <div className='w pt4'>
              <div className='lt'>
                <img data-src={p4music} alt='介绍' />
              </div>
              <div className='rt'>
                <h3 className='tit f-ff2'>手机电脑  歌单实时同步</h3>
                <p className='txt f-ff2'>
                  只要一个帐号，你就可以同步在手机、电脑上创建、收藏
                  <br />
                  的歌单，
                  <em>随时随地畅享好音乐</em>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='dcnt'>
          <div className='download-wrap'>
            <div className='w pt5'>
              <div className='lt'>
                <h3 className='tit f-ff2'>
                  听歌识曲  助你疯狂猜歌
                </h3>
                <p className='txt f-ff2'>
                  歌曲很动听却不知道歌名，歌名在嘴边却想不起来……
                  <br />
                  用
                  <em>听歌识曲</em>
                  功能，几秒钟就知道歌名
                </p>
              </div>
              <div className='rt'>
                <img data-src={p5music} alt='介绍' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownLoad
