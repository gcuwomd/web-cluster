import { List, Divider, Card, Typography } from 'antd'
import VirtualList from 'rc-virtual-list'
import { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigate } from 'react-router-dom'
dayjs.extend(relativeTime)
type ArticleListProps = {
  rounded?: boolean
  updateSite: string
}
const { Text, Title, Paragraph } = Typography
const { Item } = List
const listData = [
  {
    articleId: '123',
    author: 'JammieGriffin',
    releaseTime: '2023-6-1',
    tags: ['前端', 'JavaScript', '面试'],
    title: 'JS 原型链',
    abstract:
      'JS原型链是JS中非常重要的概念之一，它贯穿了JS的对象、继承、属性查找等多个方面。理解原型链不仅有助于我们更好地理解和应用JS，还能够帮助我们更好地处理JS代码中的各种问题。本文将详细介绍JS原型链的概念、实现方式以及相关应用，并结合示例进行讲解。',
    pageView: 123,
    likes: 10,
    surface: 'http://106.55.179.239:7002/upload/2023-3/Snipaste_2023-03-20_21-51-37.jpg'
  },
  {
    articleId: '123112',
    author: 'JammieGriffin',
    releaseTime: '2023-6-1',
    tags: ['前端', 'JavaScript', '面试'],
    title: 'JS 原型链',
    abstract:
      'JS原型链是JS中非常重要的概念之一，它贯穿了JS的对象、继承、属性查找等多个方面。理解原型链不仅有助于我们更好地理解和应用JS，还能够帮助我们更好地处理JS代码中的各种问题。本文将详细介绍JS原型链的概念、实现方式以及相关应用，并结合示例进行讲解。',
    pageView: 123,
    likes: 10,
    surface: 'http://106.55.179.239:7002/upload/2023-3/Snipaste_2023-03-21_10-31-04.jpg'
  },
  {
    articleId: '123121',
    author: 'JammieGriffin',
    releaseTime: '2023-6-1',
    tags: ['前端', 'JavaScript', '面试'],
    title: 'JS 原型链',
    abstract:
      'JS原型链是JS中非常重要的概念之一，它贯穿了JS的对象、继承、属性查找等多个方面。理解原型链不仅有助于我们更好地理解和应用JS，还能够帮助我们更好地处理JS代码中的各种问题。本文将详细介绍JS原型链的概念、实现方式以及相关应用，并结合示例进行讲解。',
    pageView: 123,
    likes: 10
  },
  {
    articleId: '123131',
    author: 'JammieGriffin',
    releaseTime: '2023-6-1',
    tags: ['前端', 'JavaScript', '面试'],
    title: 'JS 原型链',
    abstract:
      'JS原型链是JS中非常重要的概念之一，它贯穿了JS的对象、继承、属性查找等多个方面。理解原型链不仅有助于我们更好地理解和应用JS，还能够帮助我们更好地处理JS代码中的各种问题。本文将详细介绍JS原型链的概念、实现方式以及相关应用，并结合示例进行讲解。',
    pageView: 123,
    likes: 10
  },
  {
    articleId: '123141',
    author: 'JammieGriffin',
    releaseTime: '2023-6-1',
    tags: ['前端', 'JavaScript', '面试'],
    title: 'JS 原型链',
    abstract:
      'JS原型链是JS中非常重要的概念之一，它贯穿了JS的对象、继承、属性查找等多个方面。理解原型链不仅有助于我们更好地理解和应用JS，还能够帮助我们更好地处理JS代码中的各种问题。本文将详细介绍JS原型链的概念、实现方式以及相关应用，并结合示例进行讲解。',
    pageView: 123,
    likes: 10
  },
  {
    articleId: '123161',
    author: 'JammieGriffin',
    releaseTime: '2023-6-1',
    tags: ['前端', 'JavaScript', '面试'],
    title: 'JS 原型链',
    abstract:
      'JS原型链是JS中非常重要的概念之一，它贯穿了JS的对象、继承、属性查找等多个方面。理解原型链不仅有助于我们更好地理解和应用JS，还能够帮助我们更好地处理JS代码中的各种问题。本文将详细介绍JS原型链的概念、实现方式以及相关应用，并结合示例进行讲解。',
    pageView: 123,
    likes: 10
  }
]

const renderExtra = (listItem: any) => {
  if (listItem.surface) {
    return <img src={listItem.surface} alt="" width={200} />
  }
  return <></>
}

const ArticleList = ({ rounded }: ArticleListProps) => {
  // const param = useParams()
  const nav = useNavigate()
  const [data, _setData] = useState(listData)
  console.log('list render')
  const handleItemClick = (articleId: string) => {
    nav('/post/' + articleId)
  }
  return (
    <Card bodyStyle={{ padding: '0' }} className={rounded ? '' : 'rounded-t-0'}>
      <List>
        <VirtualList data={data} itemKey="articleId">
          {(item) => (
            <Item
              key={item.articleId}
              onClick={() => {
                handleItemClick(item.articleId)
              }}
              className="cursor-pointer !px-6 hover:bg-gray-200"
              extra={renderExtra(item)}
            >
              <div className="flex flex-col">
                {/* Meta */}
                <div>
                  <Text type="secondary">{item.author}</Text>
                  <Divider type="vertical" />
                  <Text type="secondary">{dayjs(item.releaseTime).fromNow()}</Text>

                  {/* article tags */}
                  <Divider type="vertical" />
                  {item.tags.map((tag, index) => {
                    if (index === item.tags.length - 1) {
                      return (
                        <Text type="secondary" key={item.articleId + index}>
                          {tag}
                        </Text>
                      )
                    }
                    return (
                      <Text type="secondary" key={item.articleId + index}>
                        {tag}
                        <Divider type="vertical" />
                      </Text>
                    )
                  })}
                </div>
                {/* title */}
                <Title level={4} className="!my-3">
                  {item.title}
                </Title>

                {/* abstract */}
                <Paragraph
                  type="secondary"
                  ellipsis={{ rows: 1 }}
                  className={item.surface ? 'max-w-128' : 'max-w-178'}
                >
                  {item.abstract}
                </Paragraph>
                {/* footer */}
                <div className="flex gap-x-4 items-center">
                  <Text type="secondary" className="flex items-center">
                    <div i-carbon:view className="text-lg mr-2"></div>
                    {item.pageView}
                  </Text>
                  <Divider type="vertical" />
                  <Text type="secondary" className="flex items-center">
                    <div i-mdi:like-outline className="text-lg mr-2"></div>
                    {item.likes}
                  </Text>
                </div>
              </div>
            </Item>
          )}
        </VirtualList>
      </List>
    </Card>
  )
}

export default ArticleList
