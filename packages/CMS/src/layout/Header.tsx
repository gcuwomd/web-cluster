import { Avatar } from 'antd'
import reactIcon from '../assets/react.svg'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const nav = useNavigate()
  return (
    <>
      <div className="w-screen px-8 py-4 bg-white fixed top-0 left-0 right-0 z-99">
        <div className="flex w-full justify-between items-center">
          <h2>网站运维部博客系统</h2>
          <div className="flex items-center">
            <ul className="list-none mr-8 flex flex-row gap-x-4">
              <li className="cursor-pointer">广场</li>
              <li
                className="cursor-pointer"
                onClick={() => {
                  nav('/profile/123')
                }}
              >
                我的主页
              </li>
            </ul>
            <div>
              <Avatar src={reactIcon} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Header
