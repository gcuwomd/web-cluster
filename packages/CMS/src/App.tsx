import { useState } from 'react'
import Header from './components/layout/Header'
import './App.css'
import Main from './components/layout/Main'
import Footer from './components/layout/Footer'

function App() {
  return (
    <>
      <div className='relative h-screen'>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}

export default App
