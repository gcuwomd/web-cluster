import Cherry from 'cherry-markdown/dist/cherry-markdown.core'
import 'cherry-markdown/dist/cherry-markdown.min.css'
import { useEffect, useState } from 'react'

const WritingPage = () => {
  const [_editor, setEditor] = useState<Cherry>()
  useEffect(() => {
    const editorNode = document.querySelector('#editor')
    if (editorNode?.innerHTML === '') {
      const editor = new Cherry({
        id: 'editor',
        toolbars:{
          showToolbar: false,
          bubble: false,
          float: false,
        }
      })
      setEditor(editor)
    }
  })
  return (
    <>
      <div id="editor" className='min-w-320 mt-5 mb-20'></div>
    </>
  )
}

export default WritingPage
