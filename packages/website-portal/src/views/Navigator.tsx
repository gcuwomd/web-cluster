import { useEffect, useState } from 'react'
import logo from '../assets/gcu-womd.png'
import Header from '../components/Header'
import { FloatButton } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { BAEE_URL } from '../api'
type Website = {
  name: string
  icon: string
  url: string
}
const Navigator = () => {
  const nav = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const code = query.get('code');

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
  useEffect(() => {

    if (code) {
      const formData = new FormData();
      formData.append("grant_type", "authorization_code")
      formData.append("redirect_uri", "http://127.0.0.1:5173")
      formData.append("code", code)
      fetch(`${BAEE_URL}/oauth2/token`, {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": "Basic bWVzc2FnaW5nLWNsaWVudDpzZWNyZXQ=",
          "Access-Control-Allow-Origin": 'no-cors'
        },
        redirect: 'follow'
      })
    }
  }, [code])

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
          onClick={() => {
            window.location = "http://43.139.117.216:9821/oauth2/authorize?response_type=code&client_id=messaging-client&scope=message.read&redirect_uri=http://127.0.0.1:5173"
          }}
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
