import { Avatar, Card, Divider, List, Typography } from 'antd'
import dayjs from 'dayjs'
import VirtualList from 'rc-virtual-list'
import { useState } from 'react'

const dynamicData = [
  {
    dynamicId: '123',
    avatar: 'http://tzyy.work:7002/avatar.jpg',
    userName: 'JammieGriffin',
    type: 'publish',
    releaseTime: '2023-6-6',
    title: 'JS this 指向',
    abstract:
      '本文将分析普通函数和箭头函数的指向问题,本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题',
    pageView: 123,
    likes: 10,
    surface: 'http://106.55.179.239:7002/upload/2023-3/Snipaste_2023-03-21_10-31-04.jpg'
  },
  {
    dynamicId: '1231',
    avatar: 'http://tzyy.work:7002/avatar.jpg',
    userName: 'JammieGriffin',
    type: 'publish',
    releaseTime: '2023-6-6',
    title: 'JS this 指向',
    abstract:
      '本文将分析普通函数和箭头函数的指向问题,本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题',
    pageView: 123,
    likes: 10,
    surface: 'http://106.55.179.239:7002/upload/2023-3/Snipaste_2023-03-21_10-31-04.jpg'
  },
  {
    dynamicId: '1232',
    avatar: 'http://tzyy.work:7002/avatar.jpg',
    userName: 'JammieGriffin',
    type: 'like',
    releaseTime: '2023-6-6',
    title: 'JS this 指向',
    abstract:
      '本文将分析普通函数和箭头函数的指向问题,本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题本文将分析普通函数和箭头函数的指向问题',
    pageView: 123,
    likes: 10,
    surface: ''
  }
]
const renderExtra = (listItem: any) => {
  if (listItem.surface) {
    return <img src={listItem.surface} alt="" width={200} />
  }
  return <></>
}
const renderDynamicHeader = (userName: string) => {
  return (
    <div>
      <div className="flex gap-x-2 my-4">
        <Typography.Text strong>{userName}</Typography.Text>
        <Typography.Text type="secondary">点赞了这篇文章</Typography.Text>
      </div>
      <Divider className="my-0" />
    </div>
  )
}
const DynamicList = () => {
  const [data, _setData] = useState(dynamicData)
  return (
    <Card className="rounded-t-0">
      <List itemLayout="vertical">
        <VirtualList data={data} itemKey="dynamicId">
          {(item) => (
            <>
              {item.type === 'like' ? renderDynamicHeader(item.userName) : <></>}
              <List.Item extra={renderExtra(item)}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.userName}
                  description={
                    <>
                      {'网站运维部干事'}
                      <Divider type="vertical" />
                      {dayjs(item.releaseTime).fromNow()}
                    </>
                  }
                />
                <div className="ml-12">
                  <Typography.Title level={5}>{item.title}</Typography.Title>
                  <Typography.Paragraph
                    type="secondary"
                    ellipsis
                    className={item.surface ? 'max-w-108' : 'max-w-168'}
                  >
                    {item.abstract}
                  </Typography.Paragraph>
                </div>
                <Divider className="!my-3" />
                <div className="flex gap-x-4 items-center">
                  <Typography.Text type="secondary" className="flex items-center">
                    <div i-carbon:view className="text-lg mr-2"></div>
                    {item.pageView}
                  </Typography.Text>
                  <Divider type="vertical" />
                  <Typography.Text type="secondary" className="flex items-center">
                    <div i-mdi:like-outline className="text-lg mr-2"></div>
                    {item.likes}
                  </Typography.Text>
                </div>
              </List.Item>
            </>
          )}
        </VirtualList>
      </List>
    </Card>
  )
}
export default DynamicList
