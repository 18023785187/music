import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { Provider } from 'react-redux'
import store from 'store'
import reportWebVitals from './reportWebVitals';
import { testPerformance } from 'utils'
/**
 * css
 */
import 'assets/css/normalize.css'
import 'assets/css/base.less'

// 向window对象注入性能检测方法
window.testPerformance = testPerformance

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 测试性能
window.setTimeout(testPerformance, 5000)
