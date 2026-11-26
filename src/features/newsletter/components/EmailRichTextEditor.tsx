import { useEffect, type ReactNode } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link2,
  Undo2,
  Redo2,
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'

type Props = {
  id?: string
  value: string
  onChange: (html: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseDown={(event) => {
        event.preventDefault()
        onClick()
      }}
      className={cn(
        'inline-flex size-8 items-center justify-center rounded-md text-foreground transition-colors',
        'hover:bg-soft disabled:pointer-events-none disabled:opacity-40',
        active && 'bg-primary/15 text-primary',
      )}
    >
      {children}
    </button>
  )
}

function isEditorEmpty(html: string) {
  const plain = html
    .replace(/<br\s*\/?>/gi, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .trim()
  return plain.length === 0
}

export function EmailRichTextEditor({
  id,
  value,
  onChange,
  disabled = false,
  placeholder = 'Write your email message…',
  className,
}: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        code: false,
        blockquote: false,
        horizontalRule: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editable: !disabled,
    editorProps: {
      attributes: {
        id: id ?? 'email-rich-text-editor',
        class: cn(
          'min-h-[9.5rem] max-h-[14rem] overflow-y-auto px-3.5 py-3 text-[0.9375rem] leading-relaxed text-foreground outline-none',
          '[&_p]:my-1 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5',
          '[&_a]:text-primary [&_a]:underline',
        ),
      },
    },
    onUpdate: ({ editor: current }) => {
      onChange(current.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    editor.setEditable(!disabled)
  }, [editor, disabled])

  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    // Avoid resetting caret when parent re-renders with the same HTML.
    if (current === value) return
    if (isEditorEmpty(current) && isEditorEmpty(value)) return
    editor.commands.setContent(value, { emitUpdate: false })
  }, [editor, value])

  function setLink() {
    if (!editor) return
    const previous = editor.getAttributes('link').href as string | undefined
    const next = window.prompt('Link URL', previous ?? 'https://')
    if (next === null) return
    const trimmed = next.trim()
    if (!trimmed) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: trimmed }).run()
  }

  if (!editor) {
    return (
      <div
        className={cn(
          'min-h-[12rem] rounded-[0.75rem] border border-border bg-surface',
          className,
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[0.75rem] border border-border bg-surface shadow-sm',
        'focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20',
        disabled && 'opacity-60',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-soft/40 px-1.5 py-1.5">
        <ToolbarButton
          label="Bold"
          active={editor.isActive('bold')}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-3.5" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive('italic')}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-3.5" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={editor.isActive('underline')}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="size-3.5" strokeWidth={2} />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        <ToolbarButton
          label="Bullet list"
          active={editor.isActive('bulletList')}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-3.5" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive('orderedList')}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-3.5" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive('link')}
          disabled={disabled}
          onClick={setLink}
        >
          <Link2 className="size-3.5" strokeWidth={2} />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        <ToolbarButton
          label="Undo"
          disabled={disabled || !editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="size-3.5" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          disabled={disabled || !editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="size-3.5" strokeWidth={2} />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export function isRichTextEmpty(html: string) {
  return isEditorEmpty(html)
}
