import { Modal, Typography, Upload, UploadProps } from 'antd'
import { useState } from 'react'
type ModalProps = {
  open: boolean
  cancel: () => void
  onOk: (content: string) => void
}

const UploadModal = ({ open, cancel, onOk }: ModalProps) => {
  const [content, setContent] = useState<string>('')
  const props: UploadProps = {
    maxCount: 1,
    accept: '.md',
    customRequest: (options) => {
      const { file, onProgress, onSuccess } = options
      onProgress!({ percent: 0 })
      const fileReader = new FileReader()
      fileReader.readAsText(file as Blob)
      fileReader.onprogress = (e) => {
        const { loaded, total } = e
        if (loaded === total) {
          onSuccess!({})
        } else {
          onProgress!({ percent: Math.floor(loaded / total) })
        }
      }
      fileReader.onloadend = (e) => {
        setContent(e.target?.result as string)
      }
    }
  }
  return (
    <>
      <Modal
        title="上传Markdown"
        open={open}
        centered
        closable={false}
        onCancel={cancel}
        onOk={() => {
          onOk(content)
        }}
      >
        <Upload.Dragger {...props}>
          <div className=" w-full flex flex-col justify-center items-center gap-y-2 px-4">
            <div className="i-bxs:file-md text-5xl text-[#1677ff]"></div>
            <Typography.Text>点击此区域或拖动文件到此区域上传</Typography.Text>
            <Typography.Text type="secondary">
              仅限上传 Markdown 文件，每次只可上传一个文件，重复上传将会覆盖已上传的文件
            </Typography.Text>
          </div>
        </Upload.Dragger>
      </Modal>
    </>
  )
}

export default UploadModal
