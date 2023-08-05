import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'uno.css'
import './assets/scss/global.scss'
import { BrowserRouter } from 'react-router-dom'
import { App as AntdApp } from 'antd'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AntdApp>
        <App />
      </AntdApp>
    </BrowserRouter>
  </React.StrictMode>
)
