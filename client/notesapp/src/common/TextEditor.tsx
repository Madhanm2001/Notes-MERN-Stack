import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from 'react-icons/fa'

type Props = {
  content: string
  onChange: (html: string) => void
}

const TextEditor: React.FC<Props> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  // toggleLink without prompt — if selected already link, unset it, else wrap with href '#'
  const toggleLink = () => {
    if (!editor) return
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().setLink({ href: '#' }).run()
    }
  }

  // toggleAlign: if already active, reset to left
  const toggleAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
    if (!editor) return
    if (editor.isActive({ textAlign: align })) {
      editor.chain().focus().setTextAlign('left').run()
    } else {
      editor.chain().focus().setTextAlign(align).run()
    }
  }

  if (!editor) return null

  const buttonClass = (active: boolean) =>
    `${active ? 'bg-blue-600' : 'bg-gray-600'} text-white p-2 rounded flex items-center justify-center`

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 bg-gray-700 p-3 rounded">
        <button onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive('bold'))}>
          <span className="font-bold">B</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive('italic'))}>
          <span className="italic">I</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={buttonClass(editor.isActive('underline'))}>
          <span className="underline">U</span>
        </button>
        <button onClick={toggleLink}
          className={buttonClass(editor.isActive('link'))}>
          🔗
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive('bulletList'))}>
          •
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive('orderedList'))}>
          1.
        </button>
        <button onClick={() => toggleAlign('left')}
          className={buttonClass(editor.isActive({ textAlign: 'left' }))}>
          <FaAlignLeft />
        </button>
        <button onClick={() => toggleAlign('center')}
          className={buttonClass(editor.isActive({ textAlign: 'center' }))}>
          <FaAlignCenter />
        </button>
        <button onClick={() => toggleAlign('right')}
          className={buttonClass(editor.isActive({ textAlign: 'right' }))}>
          <FaAlignRight />
        </button>
        <button onClick={() => toggleAlign('justify')}
          className={buttonClass(editor.isActive({ textAlign: 'justify' }))}>
          <FaAlignJustify />
        </button>
        <button onClick={() => editor.chain().focus().undo().run()}
          className="bg-gray-600 text-white p-2 rounded flex items-center justify-center">
          ⤺
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}
          className="bg-gray-600 text-white p-2 rounded flex items-center justify-center">
          ⤻
        </button>
      </div>

      <div className="border rounded bg-gray-800 text-white p-3 min-h-[150px] prose prose-invert">
        <EditorContent className='' editor={editor} />
      </div>
    </div>
  )
}

export default TextEditor
