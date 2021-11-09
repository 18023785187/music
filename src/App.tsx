import React, { Fragment, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Top from './components/Top'
import Login from './components/Login'
import Toast from './components/Toast'
import Footer from './components/Footer';
import Player from './components/Player';
import Back from './components/Back'

// 路由配置
import { NAVPATH, ROOT_NAVPATH, NOT_FOUND, SEATCH, MV, VIDEO, ALBUM, SONG, ARTIST, PLAY_LIST } from 'pages/path'
const Discover = lazy(() => import('pages/Discover'))
const DiscoverArtist = lazy(() => import('pages/DiscoverArtist'))
const DiscoverPlaylist = lazy(() => import('pages/DiscoverPlaylist'))
const DiscoverAlbum = lazy(() => import('pages/DiscoverAlbum'))
const DiscoverToplist = lazy(() => import('pages/DiscoverToplist'))
const Search = lazy(() => import('pages/Search'))
const Mv = lazy(() => import('pages/Mv'))
const Video = lazy(() => import('pages/Video'))
const Album = lazy(() => import('pages/Album'))
const Song = lazy(() => import('pages/Song'))
const Artist = lazy(() => import('pages/Artist'))
const Playlist = lazy(() => import('pages/Playlist'))
const DownLoad = lazy(() => import('pages/DownLoad'))
const NotFound = lazy(() => import('pages/NotFound'))

function App() {

  return (
    <Fragment>
      <Top />
      <Suspense fallback=''>
        <Switch>
          <Route exact path={NAVPATH.ROOT} component={Discover} />
          <Route exact path={ROOT_NAVPATH.DISCOVER} component={Discover} />
          <Route path={ROOT_NAVPATH.ARTIST} component={DiscoverArtist} />
          <Route path={ROOT_NAVPATH.PLAYLIST} component={DiscoverPlaylist} />
          <Route path={ROOT_NAVPATH.ALBUM} component={DiscoverAlbum} />
          <Route path={ROOT_NAVPATH.TOPLIST} component={DiscoverToplist} />
          <Route path={SEATCH} component={Search} />
          <Route path={MV} component={Mv} />
          <Route path={VIDEO} component={Video} />
          <Route path={ALBUM} component={Album} />
          <Route path={SONG} component={Song} />
          <Route path={ARTIST} component={Artist} />
          <Route path={PLAY_LIST} component={Playlist} />
          <Route exact path={NOT_FOUND} component={NotFound} />
          <Route exact path={NAVPATH.DOWNLOAD} component={DownLoad} />
          <Redirect to={NOT_FOUND} />
        </Switch>
        <Login />
        <Toast />
      </Suspense>
      <Footer />
      <Player />
      <Back />
    </Fragment>
  );
}

export default App;
