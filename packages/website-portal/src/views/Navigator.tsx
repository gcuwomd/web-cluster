import { useEffect, useState } from 'react'
import logo from '../assets/gcu-womd.png'
import Header from '../components/Header'
import { FloatButton } from 'antd'
import { useNavigate } from 'react-router-dom'
type Website = {
  name: string
  icon: string
  url: string
}
const Navigator = () => {
  const nav = useNavigate()
  const [websiteList, setWebsiteList] = useState<Website[]>([
    {
      name: 'test',
      icon: logo,
      url: 'http://tzyy.work'
    }
  ])
  useEffect(() => {
    const list = new Array(10)
    list.fill(websiteList[0])
    setWebsiteList(list)
  }, [])
  return (
    <>
      <Header title="网站运维部站点导航" />
      <section className="mt-10 max-w-212 flex flex-wrap">
        {websiteList.map((website, index) => {
          return (
            <a href={website.url} className="decoration-none text-text" key={index}>
              <div
                className="w-26 h-25 my-2 py-2 flex flex-col justify-center items-center hover:bg-[#f1f1f1] rounded-md cursor-pointer flex-wrap"
                key={index}
              >
                <div className="bg-white w-11 h-11 flex justify-center items-center rounded-lg shadow">
                  <img src={website.icon} alt="" className="w-4/5 h-4/5" />
                </div>
                <div className="mt-2">{website.name}</div>
              </div>
            </a>
          )
        })}
      </section>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        icon={<div className="i-ant-design:user-outlined"></div>}
        shape="square"
      >
        <FloatButton description={'您已登录'} shape="square" />
        <FloatButton icon={<div className="i-mdi:power text-xl"></div>} tooltip="退出登录" />
        <FloatButton
          icon={<div className="i-ant-design:login-outlined text-xl"></div>}
          tooltip="登录"
        />
        <FloatButton
          icon={<div className="i-ant-design:form-outlined text-xl"></div>}
          tooltip="注册"
          onClick={() => {
            nav('/register')
          }}
        />
        <FloatButton
          icon={<div className="i-mdi:forgot-password text-xl"></div>}
          tooltip="忘记密码"
          onClick={() => {
            nav('/forgot')
          }}
        />
      </FloatButton.Group>
    </>
  )
}

export default Navigator
