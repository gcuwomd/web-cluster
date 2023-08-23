import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FloatButton } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRequest } from 'alova'
import { OAuthToken, WebsiteListItem } from '../types/ResponseDataModel'
import { getUserBasicInfo } from '../api/methods/rbac'
import { LOGIN_URL, REDIRECT_URL } from '../const'
import { useSkip } from '../hooks'

const Navigator = () => {
  const nav = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const code = query.get('code');
  const skip = useSkip()
  const { send: getUserInfo, onSuccess: getUserInfoSuccess } = useRequest(getUserBasicInfo, { immediate: false })
  getUserInfoSuccess((response) => {
    const { data: { data: { websiteList } } } = response
    setWebsiteList(websiteList)
  })
  const [websiteList, setWebsiteList] = useState<WebsiteListItem[]>([])
  
  useEffect(() => {
    if (code) {
      const formData = new FormData();
      formData.append("grant_type", "authorization_code")
      formData.append("redirect_uri", REDIRECT_URL)
      formData.append("code", code)
      fetch(`/oauth/oauth2/token`, {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": "Basic bWVzc2FnaW5nLWNsaWVudDpzZWNyZXQ=",
        },
        redirect: 'follow'
      }).then((response) => response.json()).then((data: OAuthToken) => {
        localStorage.setItem("refresh_token", data.refresh_token)
        sessionStorage.setItem("access_token", `${data.token_type} ${data.access_token}`)
        getUserInfo()
      })
    }
  }, [code,getUserInfo])

  return (
    <>
      <Header title="网站运维部站点导航" />
      <section className="mt-10 max-w-212 flex flex-wrap">
        {websiteList.map((website, index) => {
          return (
            <a href={website.websiteUrl} className="decoration-none text-text" key={index}>
              <div
                className="w-26 h-25 my-2 py-2 flex flex-col justify-center items-center hover:bg-[#f1f1f1] rounded-md cursor-pointer flex-wrap"
                key={index}
              >
                <div className="bg-white w-11 h-11 flex justify-center items-center rounded-lg shadow">
                  <img src={website.websiteLogo} alt="" className="w-4/5 h-4/5" />
                </div>
                <div className="mt-2">{website.websiteName}</div>
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
            skip(LOGIN_URL)
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
