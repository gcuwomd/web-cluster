import '../../scss/modal.scss'
import { Modal, List, Button } from 'antd'
type DraftProps = {
  open: boolean
  cancel: () => void
  onImport: (id: string) => void
}
const listData = [
  {
    id: '123',
    title: '文章标题',
    description: '文章描述',
    saveDate: '2023-3-1'
  },
  {
    id: '1231',
    title: '文章标题',
    description: '文章描述',
    saveDate: '2023-3-1'
  },
  {
    id: '1232',
    title: '文章标题',
    description: '文章描述',
    saveDate: '2023-3-1'
  },
  {
    id: '1233',
    title: '文章标题',
    description: '文章描述',
    saveDate: '2023-3-1'
  },
  {
    id: '1234',
    title: '文章标题',
    description: '文章描述',
    saveDate: '2023-3-1'
  },
  {
    id: '1235',
    title: '文章标题',
    description: '文章描述',
    saveDate: '2023-3-1'
  },
  {
    id: '1236',
    title: '文章标题',
    description:
      '文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述',
    saveDate: '2023-3-1'
  }
]
const Draft = ({ open, cancel, onImport }: DraftProps) => {
  return (
    <>
      <Modal
        title="草稿"
        open={open}
        closable={false}
        footer={null}
        centered
        width={688}
        onCancel={cancel}
      >
        <div className="max-h-108 overflow-y-scroll draft-modal">
          <List
            itemLayout="horizontal"
            dataSource={listData}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Button
                    type="link"
                    onClick={() => {
                      onImport(item.id)
                    }}
                  >
                    导入
                  </Button>,
                  <Button type="link" danger>
                    删除
                  </Button>
                ]}
              >
                <List.Item.Meta title={item.title} description={item.description} />
                <div className="px-4">{item.saveDate}</div>
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  )
}

export default Draft
