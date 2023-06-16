import { Card, Typography, Divider } from 'antd'
const { Title, Text } = Typography
const PersonalStats = () => {
  return (
    <div className="flex flex-col gap-y-2 sticky top-21">
      <Card>
        <Title level={4}>个人成就</Title>
        <Divider />
        <div className='flex flex-col gap-y-4'>
          <Text>发布文章数：{10}</Text>
          <Text>获得点赞： {100}</Text>
        </div>
      </Card>
    </div>
  )
}
export default PersonalStats
