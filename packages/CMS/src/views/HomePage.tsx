// import { lazy, Suspense } from 'react'
import ArticleCat from '../components/sider/ArticleCat'
import ArticleList from '../components/ArticleList'
// const ArticleList = lazy(() => import('../components/ArticleList'))
const HomePage = () => {
  return (
    <>
      <div className="w-48">
        <ArticleCat />
      </div>
      <div className="mt-5 flex gap-x-5 justify-center">
        <ArticleList rounded={true} updateSite="home" />
      </div>
    </>
  )
}

export default HomePage
