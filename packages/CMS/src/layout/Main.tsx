import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
const Profile = lazy(() => import('../views/ProfilePage'))
const HomePage = lazy(() => import('../views/HomePage'))
const ArticlePage = lazy(() => import('../views/ArticlePage'))
const WritingPage = lazy(() => import('../views/WritingPage'))
const Main = () => {
  console.log("render main");
  
  return (
    <>
      <div className="relative min-h-4/5 mt-16 ">
        <div className="container mx-auto h-full flex flex-row justify-center gap-x-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:category" element={<HomePage />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/post/:articleId" element={<ArticlePage />} />
            <Route path='/writing' element={<WritingPage />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Main
