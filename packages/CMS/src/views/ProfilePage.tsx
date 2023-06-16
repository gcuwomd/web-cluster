import { Suspense, lazy, useState } from 'react'
import Profile from '../components/Profile'
import ProfileTabs from '../components/ProfileTabs'
import PersonalStats from '../components/sider/PersonalStats'

const ArticleList = lazy(() => import('../components/ArticleList'))
const DynamicList = lazy(() => import('../components/DynamicList'))
const TagList = lazy(() => import('../components/TagList'))
const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState<string>('articles')

  const changeTab = (tabId:string) => {
    console.log("tab change");
    
    setCurrentTab(tabId);
  }
  const renderLazyComponent = () => {
    if (currentTab === 'articles') {
      return <ArticleList updateSite='profile' />
    } else if (currentTab === 'dynamics') {
      return <DynamicList />
    } else {
      return <TagList />
    }
  }
  return (
    <>
      <div className="grow max-w-192 mt-5">
        <Profile />
        <ProfileTabs onTabChange={changeTab} />
        <Suspense fallback={<div>loading</div>}>{renderLazyComponent()}</Suspense>
      </div>
      <div className="w-72">
        <PersonalStats />
      </div>
    </>
  )
}

export default ProfilePage
