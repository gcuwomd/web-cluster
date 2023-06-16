import { Card, Typography, Button, Divider } from 'antd'
import { useState } from 'react'
type ProfileTabsProps = {
  onTabChange: (tabId: string) => void
}
const { Title } = Typography
const tabItems = [
  {
    key: 'dynamics',
    label: '动态'
  },
  {
    key: 'articles',
    label: '文章'
  },
  {
    key: 'tags',
    label: '标签'
  }
]
const articleNode = (): React.ReactNode => {
  return (
    <div className="flex justify-between mb-1">
      <Title level={4} className="!mb-0">
        文章
      </Title>
      <div className="flex">
        <Button type="link" className="py-0">
          最热
        </Button>
        <Divider type="vertical" className="h-6 top-1 m-0" />
        <Button type="link" className="py-0">
          最新
        </Button>
      </div>
    </div>
  )
}
const tabContent: Record<string, React.ReactNode> = {
  dynamics: (
    <Title level={4} className="!mb-2">
      动态
    </Title>
  ),
  articles: articleNode()
}

const ProfileTabs = ({ onTabChange }:ProfileTabsProps) => {
  const [tabKey, setTabKey] = useState<string>('articles')
  const handleTabChange = (key: string) => {
    setTabKey(key)
    onTabChange(key)
  }
  return (
    <Card
      tabList={tabItems}
      activeTabKey={tabKey}
      bodyStyle={{ paddingBottom: '8px', paddingTop: '12px' }}
      onTabChange={handleTabChange}
      className="mt-4 rounded-b-0"
    >
      {tabContent[tabKey]}
    </Card>
  )
}

export default ProfileTabs
