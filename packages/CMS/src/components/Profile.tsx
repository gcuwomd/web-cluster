import { Card, Image, Button, Typography } from 'antd'
import reactIcon from '../assets/react.svg'
import { useNavigate } from 'react-router-dom'
const { Title, Text, Paragraph } = Typography
const Profile = () => {
  const nav = useNavigate()
  return (
    <Card>
      <div className="flex flex-row gap-x-8">
        <div>
          <Image src={reactIcon} width={100} />
        </div>
        <div className="grow">
          <div className="flex justify-between">
            <div className="flex flex-col grow">
              <div className="flex justify-between items-center mb-2">
                <Title className="!mb-0" level={2}>
                  GinPang
                </Title>
                <div className="flex justify-evenly min-w-32">
                  <a href="https://github.com/JammieGriffin">
                    <div i-mdi:github text-2xl></div>
                  </a>
                  <a href="#">
                    <div i-ion:earth-outline text-2xl></div>
                  </a>
                </div>
              </div>
              <Text type="secondary">网站运维部部长</Text>
              <div className="flex items-center justify-between gap-x-5">
                <Paragraph type="secondary">
                  Hello, my friend. Welcome to my blog space ! I will share my idea and life here.
                </Paragraph>
                <div className="">
                  <Button
                    size="large"
                    type="primary"
                    onClick={() => {
                      nav('/settings/basic')
                    }}
                  >
                    修改个人资料
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Profile
