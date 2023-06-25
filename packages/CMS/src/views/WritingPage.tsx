import { FloatButton } from 'antd'
import type Cherry from 'cherry-markdown/dist/types/Cherry'
import 'cherry-markdown/dist/cherry-markdown.min.css'
import '../scss/editor.scss'
import { useEffect, useState } from 'react'
import { Suspense, lazy } from 'react'
const UploadModal = lazy(() => import('../components/modals/UploadModal'))
const DraftModal = lazy(() => import('../components/modals/Draft'))
const SaveAsDraft = lazy(() => import('../components/modals/SaveAsDraft'))
const Publish = lazy(() => import('../components/modals/Publish'))
const useEditor = async () => {
  const cherry = await import('cherry-markdown/dist/cherry-markdown.core')
  return cherry
}
const WritingPage = () => {
  const [editor, setEditor] = useState<Cherry>()
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false)
  const [isDraftOpen, setIsDraftOpen] = useState<boolean>(false)
  const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>()

  const [isPublishOpen, setIsPublishOpen] = useState<boolean>(false)
  const [isPublishSuccess, setIsPublishSuccess] = useState<boolean | undefined>()

  const [articleTitle, setArticleTitle] = useState<string>('')
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
  const handleUploadOk = (content: string) => {
    editor?.setValue(content)
    setIsUploadOpen(false)
  }
  const handleImport = (id: string) => {
    console.log(id)
    setIsDraftOpen(false)
  }
  const handleSave = (data: any) => {
    console.log(data)
    Promise.resolve(
      setTimeout(() => {
        setIsSuccess(true)
      }, 2500)
    ).then(() => {
      setIsSuccess(undefined)
    })
  }
  const handlePublish = (data: any) => {
    Promise.resolve(
      setTimeout(() => {
        console.log(data)

        setIsPublishSuccess(true)
      }, 2500)
    ).then(() => {
      setIsPublishSuccess(undefined)
    })
  }
  return (
    <>
      {/* editor */}
      <div className="min-w-320 min-h-160 2xl:min-h-216 mt-5 mb-20">
        <div id="editor" className=""></div>
      </div>
      {/* operation menu */}
      <FloatButton.Group
        style={{ insetBlockEnd: '96px' }}
        trigger="hover"
        icon={<div className="i-healthicons:ui-menu-grid-outline"></div>}
      >
        <FloatButton
          tooltip={'发布'}
          onClick={() => {
            setIsPublishOpen(true)
            setArticleTitle(document.querySelector('#editor')!.querySelector('h1')?.innerText || '')
          }}
        />
        <FloatButton
          tooltip={'保存草稿'}
          icon={<div className="i-material-symbols:save-outline"></div>}
          onClick={() => {
            setIsSaveOpen(true)
          }}
        />
        <FloatButton
          tooltip={'导入 Markdown'}
          icon={<div className="i-material-symbols:upload"></div>}
          onClick={() => {
            setIsUploadOpen(true)
          }}
        />
        <FloatButton
          tooltip={'从草稿导入'}
          icon={<div className="i-ant-design:paper-clip-outlined"></div>}
          onClick={() => {
            setIsDraftOpen(true)
          }}
        />
      </FloatButton.Group>
      {/* modals */}
      <Suspense>
        <UploadModal
          open={isUploadOpen}
          cancel={() => {
            setIsUploadOpen(false)
          }}
          onOk={handleUploadOk}
        />
        <DraftModal
          open={isDraftOpen}
          cancel={() => {
            setIsDraftOpen(false)
          }}
          onImport={(id) => {
            handleImport(id)
          }}
        />
        <SaveAsDraft
          open={isSaveOpen}
          success={isSuccess}
          cancel={() => {
            setIsSaveOpen(false)
          }}
          onSave={(data) => {
            handleSave(data)
          }}
        />
        <Publish
          open={isPublishOpen}
          title={articleTitle}
          success={isPublishSuccess}
          cancel={() => {
            setIsPublishOpen(false)
          }}
          onPublish={(data) => {
            handlePublish(data)
          }}
        />
      </Suspense>
    </>
  )
}

export default WritingPage
