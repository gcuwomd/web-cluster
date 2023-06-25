import { Card, Form, Typography, Divider, Input, Upload, Button } from 'antd'
import { useState } from 'react'
import reactIcon from '../../assets/react.svg'
const BasicInfo = () => {
  const [form] = Form.useForm()
  const [imageUrl, _setImageUrl] = useState<string>(reactIcon)

  return (
    <>
      <Card bodyStyle={{ height: '640px' }}>
        <div className="flex justify-between gap-x-8">
          <div className="grow">
            <Typography.Title level={3}>个人资料</Typography.Title>
            <Divider />
            <Form form={form} size="large" labelCol={{ span: 6 }} labelAlign="left">
              <Form.Item label="用户名" name="nickName">
                <Input showCount maxLength={20} placeholder="填写你的用户名" />
              </Form.Item>
              <Form.Item label="职位" name="position">
                <Input showCount maxLength={20} placeholder="填写你的职位" />
              </Form.Item>
              <Form.Item label="个人博客主页" name="blogUrl">
                <Input showCount maxLength={100} placeholder="填写个人博客地址" />
              </Form.Item>
              <Form.Item label="Github主页" name="githubUrl">
                <Input showCount maxLength={100} placeholder="填写你的 Github 主页地址" />
              </Form.Item>
              <Form.Item label="个人简介" name="introduction">
                <Input.TextArea
                  showCount
                  maxLength={100}
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  placeholder="填写擅长的事情，喜欢的事情，你的技能等"
                />
              </Form.Item>
              <Divider />
              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button size="large" type="primary" htmlType="submit">
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="mx-8 my-8 max-w-28 flex flex-col gap-y-2">
            <Upload name="avatar" listType="picture-circle" showUploadList={false}>
              <div className="w-full flex flex-col items-center gap-y-2">
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <></>}
                <Typography.Text>我的头像</Typography.Text>
              </div>
            </Upload>
            <Typography.Text type="secondary">
              点击头像可以修改头像支持 jpg、png、jpeg 格式大小 5M 以内的图片
            </Typography.Text>
          </div>
        </div>
      </Card>
    </>
  )
}
export default BasicInfo
