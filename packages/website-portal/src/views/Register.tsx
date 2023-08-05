import Header from '../components/Header'
import { Card, Form, Input, Typography, Button, Cascader, Space, InputNumber, App } from 'antd'
import { useChecker, useSkip } from '../hooks/index'
import { useEffect, useState } from 'react'
import { RegisterModel, RegistrationModel } from '../types/RequestDataModel'
import { useRequest } from 'alova'
import { registraion, getCaptcha } from '../api/methods/auth'
import { alovaErrorHandler } from '../api/middleware'
type OrgOption = {
  label: string
  value: string
  children?: OrgOption[]
}
const orgOptions: OrgOption[] = [
  {
    label: '学生网络与信息工作委员会',
    value: 'SNIC',
    children: [
      {
        label: '网站运维部',
        value: 'WOMD'
      },
      {
        label: '网络运维部',
        value: 'NOMD'
      },
      {
        label: '信息化运维部',
        value: 'IOMD'
      },
      {
        label: '行政秘书部',
        value: 'SAD'
      }
    ]
  },
  {
    label: '访客',
    value: 'visitor'
  }
]
const Register = () => {
  // antd Form 表单实例
  const [form] = Form.useForm()
  // antd message 组件实例
  const { message } = App.useApp()
  const { checkUserName, checkPassword, checkPhone } = useChecker()
  // 用于控制发送验证码按钮是否可点击
  const [disabled, setDisabled] = useState<boolean>(false)
  // 用于显示倒计时
  const [time, setTime] = useState<number>(0)
  const skip = useSkip()
  /**
   * @description 使用 alova 的 useRequest 钩子发送网络请求
   * 从 useRequest 中解构出三个方法：send,onSuccess,onError
   * send: 用于发送请求
   * onSuccess：对请求成功时做的处理
   * onError：对请求失败时做的处理
   */
  const {
    send: register,
    onSuccess: onRegistrationSuccess,
    onError: onRegistrationError
  } = useRequest(
    /**
     * useRequest 的第一个参数为请求方法处理器
     * @param {RegistrationModel} registant 
     * @returns alova post 方法实例，该方法在 src/api/methods/auth.ts 中定义
     */
    (registant: RegistrationModel) => registraion(registant),
    /**
     * useRequest 的第二个参数为请求的配置项
     */
    {
      // 使用 useRequest 会默认发起一次网络请求，通过设置 immediate:false 来关闭它
      immediate: false,
      middleware: async (_, next) => {
        const { code, msg } = await next()
        alovaErrorHandler(code, msg)
      }
    })
  const {
    send: getCode,
    onSuccess: onGetCodeSuccess,
    onError: onGetCodeError
  } = useRequest((email: string) => getCaptcha(email), { immediate: false })
  const handleFinish = (value: RegisterModel) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { verifyPassword: _verifyPassword, departmentId: _departmentId, ...rest } = value
    register({ ...rest, departmentId: '1' })
  }
  onRegistrationSuccess((e) => {
    message.success(e.data.data)
    form.resetFields()
  })
  onRegistrationError((e) => {
    message.error(e.error.message)
  })
  const sendCaptachRequest = () => {
    form.validateFields([['email']]).then(() => {
      setDisabled(true)
      setTime(60)
      getCode(form.getFieldValue('email'))
    })
  }
  onGetCodeError((e) => {
    message.error(e.error.message)
  })
  onGetCodeSuccess(() => {
    message.success('验证码已发送，请前往邮箱查看验证码')
  })
  useEffect(() => {
    if (disabled && time > 0) {
      setTimeout(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    }
    if (time === 0) {
      setDisabled(false)
    }
  }, [time, disabled])
  return (
    <>
      <Header title="网站运维部统一登录平台" />
      <Card bodyStyle={{ width: '432px', padding: '48px' }} className="shadow-lg">
        <Form form={form} layout="vertical" onFinish={handleFinish} validateTrigger="onBlur">
          <Form.Item
            label="学号"
            name="username"
            rules={[
              {
                required: true,
                validator: (_rule, value) => {
                  if (!value) {
                    return Promise.reject('请输入学号')
                  }
                  if (!checkUserName(value)) {
                    return Promise.reject('输入的学号格式不合法')
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input placeholder="请输入学号" />
          </Form.Item>
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              {
                required: true,
                validator: (_rule, value) => {
                  if (!value) {
                    return Promise.reject('请输入手机号')
                  }
                  if (!checkPhone(value)) {
                    return Promise.reject('输入的手机号格式不合法')
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            tooltip="密码必须包含大写、小写字母，数字，特殊字符：!@#$%^&* 之中的两种"
            rules={[
              {
                required: true,
                validator: (_rule, value) => {
                  if (!value) {
                    return Promise.reject('请输入密码')
                  }
                  if (!checkPassword(value)) {
                    return Promise.reject('密码格式不正确')
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="verifyPassword"
            rules={[
              {
                required: true,
                validator: (_rule, value) => {
                  if (!value) {
                    return Promise.reject('请输入密码')
                  }
                  if (!checkPassword(value)) {
                    return Promise.reject('密码格式不正确')
                  }
                  const password = form.getFieldValue('password')
                  if (password !== value) {
                    return Promise.reject('两次输入的密码不一致')
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input.Password placeholder="请再次输入密码" />
          </Form.Item>
          <Form.Item
            label="组织"
            name="departmentId"
            rules={[{ required: true, message: '请选择所属组织' }]}
          >
            <Cascader options={orgOptions} placeholder="请选择所属组织" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { type: 'email', message: '邮箱格式不正确' },
              { required: true, message: '请输入邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱地址" />
          </Form.Item>
          <Form.Item>
            <Space className="w-full items-">
              <Form.Item
                label="邮箱验证码"
                name="code"
                rules={[
                  {
                    required: true,
                    validator: (_rule, value: number) => {
                      if (!value) {
                        return Promise.reject('请输入邮箱验证码')
                      }
                      if (!(value >= 1000 && value <= 9999)) {
                        return Promise.reject('邮箱验证码必须是四位数字')
                      }
                      return Promise.resolve()
                    }
                  }
                ]}
              >
                <InputNumber
                  controls={false}
                  style={{ width: '226px' }}
                  placeholder="请输入邮箱验证码"
                />
              </Form.Item>
              <Button
                type="primary"
                style={{ width: '102px', marginTop: '9px' }}
                onClick={sendCaptachRequest}
                disabled={disabled}
              >
                {!disabled ? '获取验证码' : `${time} s`}
              </Button>
            </Space>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-[#1677ff]">
              注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <section className="mt-10 mb-20">
        <Typography.Text type="secondary">已有账号？</Typography.Text>
        <Typography.Link
          onClick={() => {
            skip('http://43.139.117.216:9821/oauth2/authorize?response_type=code&client_id=messaging-client&scope=message.read&redirect_uri=http://127.0.0.1:5173')
          }}
        >
          前往登录
        </Typography.Link>
      </section>
    </>
  )
}

export default Register
