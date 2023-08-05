
import { Route, Routes } from 'react-router-dom'
import logo from "./assets/gcu-womd.png"
import { lazy } from 'react'
const Navigator = lazy(() => import("./views/Navigator"))
const Register = lazy(()=> import("./views/Register"))
const Forgot = lazy(()=> import("./views/Forgot"))
function App() {

  return (
    <>
      <main className='min-h-screen w-full flex flex-col justify-center items-center font-mono bg-background'>
        <section className='mt-20'>
          <div className='w-20 mx-auto mb-5'>
            <img src={logo} alt="" className='w-full' />
          </div>
        </section>
        <Routes>
          <Route path='/' element={<Navigator />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot' element={<Forgot />} />
        </Routes>
      </main>
    </>
  )
}

export default App
