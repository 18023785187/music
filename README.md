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

配置了less，路径别名

新增了工作区文件夹

开启https

所有安装配置通过测试

完成了登录弹窗组件和提示框组件，下一步将进行路由的配置和首页的编写

完成了首页

完成了下载页和404页

完成了歌单页

完成了新碟页

完成了歌手页

目前进行排行榜页的编写

<h1>概述</h1>
<p>使用react对网易云网页版进行仿写</p>
<p>
接口来自优秀的开源项目<a href='https://github.com/Binaryify/NeteaseCloudMusicApi'>网易云api接口</a>
</p>
<p>
使用的主要技术有:
<strong>
React Hooks、typescript、less、create-app-react、react-router-dom、react-redux、axios
</strong>
</p>
<p>
使用了个人npm包<strong><a href='https://github.com/18023785187/h-tools'>h-tools-js</a></strong>(一个ui功能组件库、如懒加载)
</p>

# 作品链接
<a href='music-xi-cyan.vercel.app'>music-xi-cyan.vercel.app</a>

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

