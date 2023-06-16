import { Card, Menu, MenuProps } from 'antd'
import { ReactNode, Key } from 'react'
import { useNavigate } from 'react-router-dom'
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
const items: MenuProps['items'] = [
  getItem('综合', 'recommanded', <div className="i-mdi:compass !text-lg"></div>),
  getItem('前端三剑客', 'H5C3JS', <div className="i-icon-park-twotone:source-code !text-lg"></div>),
  getItem('Vue', 'vue', <div className="i-cib:vue-js !text-xl"></div>),
  getItem('React', 'react', <div className="i-uil:react !text-xl"></div>),
  getItem('前端部署', 'font-end deploy', <div className="i-eos-icons:blockchain !text-lg"></div>),
  getItem('Linux', 'linux', <div className="i-material-symbols:terminal !text-lg"></div>),
  getItem('开发工具', 'tools', <div className="i-codicon:tools !text-lg"></div>),
  getItem('后端', 'back-end', <div className="i-icon-park-outline:data-switching !text-lg"></div>)
]
const ArticleCat = () => {
  const nav = useNavigate()
  const handleClick: MenuProps['onClick'] = (e) => {
    nav(`/${e.key}`)
  }
  return (
    <div className="sticky top-21">
      <Card bodyStyle={{ padding: '4px' }}>
        <Menu
          items={items}
          mode="inline"
          className="!border-0 text-base"
          defaultSelectedKeys={['recommanded']}
          onClick={handleClick}
        />
      </Card>
    </div>
  )
}

export default ArticleCat
