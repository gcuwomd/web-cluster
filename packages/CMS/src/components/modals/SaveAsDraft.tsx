import { Modal, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
type Props = {
  open: boolean
  cancel: () => void
  onSave: (data: any) => void
  success?: boolean
}

const SaveAsDraft = ({ open, cancel, onSave, success }: Props) => {
  const [form] = Form.useForm()
  const [messageInst, contexHolder] = message.useMessage()
  const [disabled, setDisabled] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleOk = () => {
    form.submit()
  }

  const closeModal = () => {
    form.resetFields()
    cancel()
  }
  const loading = () => {
    setIsLoading(true)
    setDisabled(true)
  }
  const onload = () => {
    setIsLoading(false)
    setDisabled(false)
  }
  const handleFinish = (value: any) => {
    loading()
    onSave(value)
  }
  useEffect(() => {
    if (typeof success === 'undefined') return
    onload()
    if (success) {
      messageInst.success('保存成功')
      closeModal()
    } else {
      messageInst.error('保存失败')
    }
  }, [success])
  const handleFaild = () => {
    messageInst.error('表单校验不通过')
  }
  return (
    <>
      {contexHolder}
      <Modal
        title="保存草稿"
        open={open}
        closable={false}
        centered
        cancelButtonProps={{ disabled: disabled }}
        confirmLoading={isLoading}
        maskClosable={false}
        keyboard={false}
        onCancel={closeModal}
        onOk={handleOk}
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          onFinish={handleFinish}
          onFinishFailed={handleFaild}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入草稿的标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default SaveAsDraft
