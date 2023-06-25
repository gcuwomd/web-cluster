import {
  Card,
  Divider,
  Input,
  InputRef,
  Select,
  Space,
  Switch,
  Tag,
  Tooltip,
  Typography
} from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import '../../scss/settings.scss'
const tagList = [
  {
    name: 'vue',
    color: '',
    id: '123'
  },
  {
    name: 'vue',
    color: '',
    id: '123'
  },
  {
    name: '前端面试',
    color: '',
    id: '123'
  },
  {
    name: 'vue',
    color: '',
    id: '123'
  },
  {
    name: 'vue',
    color: '',
    id: '123'
  },
  {
    name: '前端面试',
    color: '',
    id: '123'
  },
  {
    name: 'vue',
    color: '',
    id: '123'
  },
  {
    name: 'vuevvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',
    color: '',
    id: '123'
  },
  {
    name: '前端面试',
    color: '',
    id: '123'
  }
]
const colorList: string[] = [
  'processing',
  'success',
  'error',
  'warning',
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
]
const TagInfo = () => {
  const [tags, setTags] = useState(tagList)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  // 编辑已有标签的相关状态
  const [editIndex, setEditIndex] = useState<number>(-1)
  const [editValue, setEditValue] = useState<string>('')
  const editRef = useRef<InputRef>(null)

  const [isConfirm, setIsConfirm] = useState<boolean>(false)
  const [currentColor, setCurrentColor] = useState<string>('processing')

  // 添加标签的相关状态
  const [isAppend, setIsAppend] = useState<boolean>(false)
  const [appendValue, setAppendValue] = useState<string>()
  const appendRef = useRef<InputRef>(null)

  useEffect(() => {
    if (editIndex !== -1) {
      editRef.current?.focus()
    }
  }, [editIndex])
  useEffect(() => {
    if (isAppend) {
      appendRef.current?.focus()
    }
  }, [isAppend])
  const handleConfirm = (index: number) => {
    setIsConfirm(true)
    // const history = tags[index]
    const newTags = [...tags]
    tags[index].name = editValue
    tags[index].color = currentColor
    Promise.resolve()
      .then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            setTags(newTags)
            resolve(null)
          }, 2500)
        })
      })
      .then(() => {
        setIsConfirm(false)
        setEditIndex(-1)
      })
  }
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  const handleAppendConfirm = () => {
    console.log('append confirm')

    setIsAppend(false)
  }
  const handleAppendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppendValue(e.target.value)
  }
  return (
    <>
      <Card bodyStyle={{ height: '640px' }}>
        <Typography.Title level={3}>标签管理</Typography.Title>
        <Divider />
        <div className="setting-tag">
          <Space size={12}>
            <Typography.Text type="danger">删除模式</Typography.Text>
            <Switch
              checked={isDelete}
              onChange={() => {
                setIsDelete(!isDelete)
              }}
            />
            <Typography.Text>标签颜色</Typography.Text>
            <Select
              className="w-64"
              value={currentColor}
              onChange={(value) => {
                setCurrentColor(value)
              }}
            >
              {colorList.map((color) => {
                return (
                  <Select.Option value={color} key={color}>
                    <div className="flex justify-between">
                      <span>{color}</span>
                      <div>
                        <Tag color={color}>{color}</Tag>
                      </div>
                    </div>
                  </Select.Option>
                )
              })}
            </Select>
            <Tooltip title="选择标签的颜色，该颜色会在修改标签和添加标签时生效">
              <div className="i-material-symbols:help-outline text-lg"></div>
            </Tooltip>
          </Space>
        </div>
        <Divider />

        <Space wrap>
          {tags.map((tag, index) => {
            if (editIndex === index) {
              return (
                <Input
                  ref={editRef}
                  key={tag.id}
                  value={editValue}
                  prefix={
                    isConfirm ? (
                      <div className="i-line-md:loading-loop inline-block mr-1 mt-1"></div>
                    ) : (
                      <></>
                    )
                  }
                  disabled={isConfirm}
                  onChange={handleEditChange}
                  onBlur={() => {
                    handleConfirm(index)
                  }}
                  onPressEnter={() => {
                    handleConfirm(index)
                  }}
                />
              )
            }
            const isLong = tag.name.length > 20
            const tagEl = (
              <Tag
                key={tag.id + index}
                bordered={true}
                color={tag.color ? tag.color : 'processing'}
                className="text-base py-1 px-4 select-none"
                closable={isDelete}
              >
                <span
                  onDoubleClick={(e) => {
                    setEditIndex(index)
                    setEditValue(tag.name)
                    e.preventDefault()
                  }}
                >
                  {isLong ? `${tag.name.slice(0, 20)}...` : tag.name}
                </span>
              </Tag>
            )
            return isLong ? (
              <Tooltip title={tag.name} key={tag.id + index}>
                {tagEl}
              </Tooltip>
            ) : (
              tagEl
            )
          })}
          {isAppend ? (
            <Input
              ref={appendRef}
              value={appendValue}
              prefix={
                isConfirm ? (
                  <div className="i-line-md:loading-loop inline-block mr-1 mt-1"></div>
                ) : (
                  <></>
                )
              }
              disabled={isConfirm}
              onChange={handleAppendChange}
              onBlur={() => {
                handleAppendConfirm()
              }}
              onPressEnter={() => {
                handleAppendConfirm()
              }}
            />
          ) : (
            <Tag
              className="text-base py-1 px-4 border-dashed bg-white"
              onClick={() => {
                setIsAppend(true)
              }}
            >
              <div className="flex items-center">
                <div className="i-ic:baseline-plus inline-block text-xl text-[#8c8c8c]"></div>
                <Typography.Text type="secondary">添加标签</Typography.Text>
              </div>
            </Tag>
          )}
        </Space>
      </Card>
    </>
  )
}
export default TagInfo
