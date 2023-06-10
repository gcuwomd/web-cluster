import { Card, Image,Button } from 'antd'
import reactIcon from '../assets/react.svg'
const Profile = () => {
  return (
    <Card>
      <div className='flex flex-row gap-x-8'>
        <div>
          <Image src={reactIcon} width={100} />
        </div>
        <div className='grow'>
          <div className="flex justify-between items-center">
            <h2>桃枝妖妖</h2>
            <div>
              <div>
                <a href="https://github.com/JammieGriffin">
                  <div i-mdi:github text-2xl></div>
                </a>
              </div>
              <div>
                <Button type='primary'>编辑个人资料</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Profile
