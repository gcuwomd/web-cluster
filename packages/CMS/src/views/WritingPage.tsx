import { FloatButton } from 'antd'
import type Cherry from 'cherry-markdown/dist/types/Cherry'
import 'cherry-markdown/dist/cherry-markdown.min.css'
import '../scss/editor.scss'
import { useEffect, useState } from 'react'
import { Suspense, lazy } from 'react'
const UploadModal = lazy(() => import('../components/modals/UploadModal'))
const useEditor = async () => {
  const cherry = await import('cherry-markdown/dist/cherry-markdown.core')

  return cherry
}
const WritingPage = () => {
  const [editor, setEditor] = useState<Cherry>()
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false)
  useEffect(() => {
    let onMounted = true
    useEditor().then((cherry) => {
      if (onMounted) {
        const editor = new cherry.default({
          id: 'editor',
          toolbars: {
            showToolbar: false,
            bubble: false,
            float: false
          }
        })
        setEditor(editor)
      }
    })
    return () => {
      onMounted = false
    }
  }, [])
  const handleOk = (content: string) => {
    editor?.setValue(content)
    setIsUploadOpen(false)
  }
  return (
    <>
      <div id="editor" className="min-w-320 mt-5 mb-20"></div>
      <FloatButton.Group
        style={{ insetBlockEnd: '96px' }}
        trigger="hover"
        icon={<div className="i-healthicons:ui-menu-grid-outline"></div>}
      >
        <FloatButton tooltip={'发布'} />
        <FloatButton
          tooltip={'保存草稿'}
          icon={<div className="i-material-symbols:save-outline"></div>}
          onClick={() => {
            setIsUploadOpen(true)
          }}
        />
        <FloatButton
          tooltip={'导入 Markdown'}
          icon={<div className="i-material-symbols:upload"></div>}
        />
      </FloatButton.Group>
      <Suspense>
        <UploadModal
          open={isUploadOpen}
          cancel={() => {
            setIsUploadOpen(false)
          }}
          onOk={handleOk}
        />
      </Suspense>
    </>
  )
}

export default WritingPage
