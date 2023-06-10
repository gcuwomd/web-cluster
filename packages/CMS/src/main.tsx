import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Profile from './components/Profile.tsx'
import './index.css'
import 'uno.css'
import './scss/global.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
