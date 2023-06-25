import { Button, Card, Menu, MenuProps } from 'antd'
import { ReactNode, Key, lazy, Suspense } from 'react'
import '../scss/settings.scss'
import { Route, Routes, useNavigate } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number]
const getItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    label,
    children,
    icon,
    type
  } as MenuItem
}
const items: MenuProps['items'] = [getItem('个人信息', 'basic'), getItem('标签管理', 'tags')]
const BasicInfo = lazy(() => import('../components/settings/BasicInfo'))
const TagInfo = lazy(() => import('../components/settings/TagInfo'))
const SettingsPage = () => {
  const nav = useNavigate()
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    nav(`/settings/${e.key}`)
  }
  return (
    <>
      <Suspense>
        <div className="flex flex-col w-244">
          <div className="w-full mt-5">
            <Card bodyStyle={{ padding: '6px' }}>
              <Button type="link" onClick={() => {nav('/profile')}}>返回个人主页</Button>
            </Card>
          </div>
          <div className="flex gap-x-5">
            <div className="mt-5 w-47">
              <Card bodyStyle={{ padding: '4px', height: '640px' }}>
                <Menu
                  items={items}
                  mode="inline"
                  className="setting-menu !border-0 text-base text-center"
                  defaultSelectedKeys={['basic']}
                  onClick={handleMenuClick}
                />
              </Card>
            </div>
            <div className="w-192 mt-5 mb-20">
              <Routes>
                <Route path="basic" element={<BasicInfo />} />
                <Route path="tags" element={<TagInfo />} />
              </Routes>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}
export default SettingsPage
