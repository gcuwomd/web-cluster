import Header from './layout/Header'
import './App.css'
import Main from './layout/Main'
import Footer from './layout/Footer'
import { FloatButton } from 'antd'
import { useNavigate } from 'react-router-dom'

function App() {
  const nav = useNavigate()
  return (
    <>
      <div className="relative min-h-screen">
        <Header />
        <Main />
        <Footer />
      </div>
      <FloatButton.Group>
        <FloatButton
          icon={<div className="i-bx:edit"></div>}
          tooltip="写文章"
          onClick={() => {
            nav('/writing')
          }}
        />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
    </>
  )
}

export default App
