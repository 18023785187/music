# 网易云音乐网页版分云

<a href="https://github.com/18023785187/music/search?l=typescript"><img src="https://img.shields.io/github/languages/top/18023785187/music.svg" alt="TopLang"></a>

###### 🚀 高度仿写网易云音乐网页版、励志做一流的钓鱼网站！

---

#### 说明

该项目仅供学习使用，不作任何商业用途

#### 启动本地服务

```
$ git clone https://github.com/18023785187/music.git
```
```
$ yarn install
```
```
$ yarn start
```

注意：

1. 默认启动的是https服务，如果需要使用http服务那么需要把 yarn start 改为 yarn start-http
2. 接口地址在 src/network/constant.ts -> BASE_URL
3. 在控制台调用window.testPerformance方法可以打印当前性能状况(效果如下)

<img src='https://z3.ax1x.com/2021/10/25/54w7lT.png' width='581' height='235' />

---

#### 进度

已完成大部分功能，还需要完善登录后的功能、个人主页、点赞、转发等功能

---

#### 更新日志

- 安装了一系列npm包
    h-tools-js
    axios
    redux
    react-redux
    react-router-dom
    redux-devtools-extension
    pubsub-js
    less
    less-loader
    customize-cra
    react-app-rewired
    cross-env
    qs

- 配置了less，路径别名

- 新增了工作区文件夹

- 开启https

- 所有安装配置通过测试

- 完成了登录弹窗组件和提示框组件

- 完成了首页

- 完成了下载页和404页

- 完成了歌单页

- 完成了新碟页

- 完成了歌手页

- 完成了排行榜页

- 完成了搜索功能

- 完成了播放器

- 完成了视频、mv页

- 新增性能测试模块

- 开辟多个详情组件页，待施工

- 清理一些以前未处理的组件卸载后该清理的异步操作，优化一些组件的代码结构

- 完善顶部导航栏的用户功能

- 多个详情页基本完工，还剩歌单页

- 对一些组件进行代码重构以进行性能优化，降低耦合度

- 完善视频播放器

---

#### BUG清单（在有空的情况下会进行修复）

- 目前频繁切换音频会导致控制台报错

- 播放器切歌在某种未知情况下偶尔会发生歌曲不能切换

- 一些组件存在异步未清除干净，造成内存泄漏

- 首页轮播图在未知情况下轮播滚动问题

- 视频播放器音量调节小bug，时间提示器小bug

- 评论按时间排序分页bug

- 二维码登录点击秒退还在轮询bug，二维码登录是最先编写的组件，所以不规范，预计会重做

---

#### 概述

使用react对网易云网页版进行仿写

接口来自开源项目<a href='https://github.com/Binaryify/NeteaseCloudMusicApi'>网易云api接口</a>

使用的主要技术有:

<strong>React Hooks、typescript、less、create-app-react、react-router-dom、react-redux、axios</strong>

使用了个人npm包<strong><a href='https://github.com/18023785187/h-tools'>h-tools-js</a></strong>(一个ui功能组件库、如懒加载)

#### 功能（目前实现部分功能）

- 登录（二维码登录、验证码登录、手机密码登录、邮箱登录）

- 播放器（进度条、播放列表展示、歌词展示、快进、切歌、音量调节、歌词跟踪、播放/暂停）

- 视频页（进度条、视频播放/暂停、快进、音量调节、进度提示、分辨率切换、全屏）

- 搜索（搜索部分结果、搜索结果页）

- 评论展示

- 首页

- 排行榜

- 专辑栏

- 歌手栏

- 歌单栏

- 电台栏

- 下载页

- 404页

- 歌手主页

- 个人主页

- 用户主页

- 歌曲详情页

- 歌单详情页

- 专辑详情页

- 签到、点赞、发表评论等

- 等等

---

#### 作品链接

<a href='https://music-eight-tau.vercel.app'>https://music-eight-tau.vercel.app</a>
（不定期进行地址更新）

---

#### 图片展示(仅对部分页面进行展示)

###### 首页

<img src="https://i.loli.net/2021/10/22/nxdWa642kFPIXJc.png" alt="首页" width='1000' height="600">

---

###### 播放器

<img src="https://i.loli.net/2021/10/22/vfVAnZBc6w3YIHS.png" alt="播放器" width='984' height="302">

---

###### 登录弹窗

<img src="https://i.loli.net/2021/10/22/V3Dw2fPqvCE51eA.png" alt="登录弹窗" width='551' height="388">

---

###### 排行榜

<img src="https://i.loli.net/2021/10/22/xhHC3AiQYWvpzOZ.png" alt="排行榜" width='1000' height="500">

---

###### 歌单

<img src="https://i.loli.net/2021/10/22/FQCsJ7V6ljTSfrU.png" alt="歌单" width='1000' height="500">

---

###### 歌手

<img src="https://i.loli.net/2021/10/22/fKFMPuatgBILC9G.png" alt="歌手" width='1000' height="500">

---

###### 新碟上架

<img src="https://i.loli.net/2021/10/22/aImlyuCKotG7fOi.png" alt="新碟上架" width='1000' height="500">

---

###### 搜索

<img src="https://i.loli.net/2021/10/22/Au5Pv7dq6ZM9G3Q.png" alt="搜索" width='1000' height="500">

<img src="https://i.loli.net/2021/10/22/sm1lIFGEk2Jg7xP.png" alt="搜索" width='983' height="863">

<img src="https://i.loli.net/2021/10/22/zUqHTyVxuAjgPb3.png" alt="搜索" width='983' height="863">

---

###### 视频

<img src="https://i.loli.net/2021/10/22/aq4RB3dNGYZKgmA.png" alt="视频" width='1000' height="500">

---

###### 下载

<img src="https://i.loli.net/2021/10/22/Tvq5FhMuCE6R1o9.png" alt="下载" width='1000' height="500">

---

#### 目录

    -node_modules
    |
    |
    -public  <--  静态文件夹
    |
    |
    -src  <--  工作区
    |
    |
    -.gitignore
    |
    |
    -config-overrides.js  <--  webpack.config拓展文件
    |
    |
    -example.com+5-key.pem  <--  SSL协议localhost域名的密钥
    |
    |
    -example.com+5.pem  <--  SSL协议localhost域名的证书
    |
    |
    -package.json
    |
    |
    -README.md
    |
    |
    -tsconfig.json
    |
    |
    -tsconfig.path.json  <--  ts配置路径别名文件
    |
    |
    yarn.lock
