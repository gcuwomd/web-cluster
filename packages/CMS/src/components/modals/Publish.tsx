import { Modal, Form, Input, Select, message } from 'antd'
import { useEffect, useState } from 'react'
type PublishProps = {
  open: boolean
  title: string
  success: boolean | undefined
  cancel: () => void
  onPublish: (data: any) => void
}
const locationOptions = [
  { label: '前端三件客', value: '123' },
  { label: 'Vue', value: '12345' },
  { label: 'React', value: '12312' }
]
const tagOptions = [
  { label: '前端三件客', value: '123' },
  { label: 'Vue', value: '12345' },
  { label: 'React', value: '12312' }
]
const Publish = ({ open, cancel, onPublish, title, success }: PublishProps) => {
  const [form] = Form.useForm()
  const [messageInst, contexHolder] = message.useMessage()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const loading = () => {
    setIsLoading(true)
    setIsDisabled(true)
  }
  const onload = () => {
    setIsLoading(false)
    setIsDisabled(false)
  }
  const handleFinish = (value: any) => {
    loading()
    onPublish(value)
  }
  const handleFaild = () => {
    messageInst.error('表单校验不通过')
  }
  const closeModal = () => {
    form.resetFields()
    cancel()
  }
  useEffect(() => {
    if (typeof success === 'undefined') {
      return
    }
    onload()
    if (success) {
      messageInst.success('发布成功')
      closeModal()
    } else {
      messageInst.error('发布失败')
    }
  }, [success])
  return (
    <>
      {contexHolder}
      <Modal
        title="发布文章"
        open={open}
        closable={false}
        centered
        width={512}
        cancelButtonProps={{ disabled: isDisabled }}
        confirmLoading={isLoading}
        onCancel={closeModal}
        onOk={() => {
          form.submit()
        }}
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          disabled={isDisabled}
          initialValues={{ title: title }}
          onFinish={handleFinish}
          onFinishFailed={handleFaild}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="发布位置"
            name="location"
            rules={[{ required: true, message: '请选择发布位置' }]}
          >
            <Select allowClear placeholder="请选择文章的发布位置" options={locationOptions} />
          </Form.Item>
          <Form.Item
            label="标签"
            name="tags"
            rules={[{ required: true, message: '请至少选择一个标签' }]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="请选择你的文章标签"
              options={tagOptions}
            />
          </Form.Item>
          <Form.Item
            label="外链"
            name="reference"
            validateTrigger="onBlur"
            rules={[
              {
                required: false,
                validator: (_rule, value) => {
                  if (!value) {
                    return Promise.resolve()
                  }
                  console.log(value)
                  const regex = new RegExp('^(https?://[^s;]+)(;s*https?://[^s;]+)*$', 'gm')
                  if (!regex.test(value)) {
                    return Promise.reject("多个外链之间需要用 ';' 隔开，最后一个外链不需要加分号")
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default Publish
