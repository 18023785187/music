# 进度
    已完成大部分功能，还需要完善登录后的功能、视频播放器的一部分功能、歌手主页、个人主页、歌曲详情页、点赞、转发等功能

# 更新日志
安装了一系列npm包
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

配置了less，路径别名

新增了工作区文件夹

开启https

所有安装配置通过测试

完成了登录弹窗组件和提示框组件

完成了首页

完成了下载页和404页

完成了歌单页

完成了新碟页

完成了歌手页

完成了排行榜页

完成了搜索功能

完成了播放器

完成了视频、mv页

<div>
    <h1>概述</h1>
    <p>使用react对网易云网页版进行仿写</p>
    <p>接口来自开源项目<a href='https://github.com/Binaryify/NeteaseCloudMusicApi'>网易云api接口</a></p>
    <p>使用的主要技术有:
        <strong>React Hooks、typescript、less、create-app-react、react-router-dom、react-redux、axios</strong>
    </p>
    <p>
        使用了个人npm包<strong><a href='https://github.com/18023785187/h-tools'>h-tools-js</a></strong>(一个ui功能组件库、如懒加载)
    </p>
    <ul>
        <h4>实现的功能<h4>
        <li>登录（二维码登录、验证码登录、手机密码登录、邮箱登录）</li>
        <li>播放器（进度条、播放列表展示、歌词展示、快进、切歌、音量调节、歌词跟踪、播放/暂停）</li>
        <li>视频页（进度条、视频播放/暂停、快进、音量调节、进度提示、分辨率切换、全屏）</li>
        <li>搜索（搜索部分结果、搜索结果页）</li>
        <li>评论展示</li>
        <li>首页</li>
        <li>排行榜</li>
        <li>专辑栏</li>
        <li>歌手栏</li>
        <li>歌单栏</li>
        <li>下载页</li>
        <li>404页</li>
    </ul>
</div>

# 作品链接
<a href='music-five-bice.vercel.app'>music-five-bice.vercel.app（不定期进行地址更新）</a>

## 目录

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

