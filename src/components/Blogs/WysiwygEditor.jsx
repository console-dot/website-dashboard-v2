
import { useEffect, useRef, useState, useMemo } from "react"
import config from "../../api/config"
import { addFile } from "../../api/file"
// import { addFile } from "../api/file"
// import config from "../api/config"

const WysiwygEditor = ({ value, onChange, placeholder = "Write your blog content here..." }) => {
  const [editorHtml, setEditorHtml] = useState(value || "")
  const [ReactQuill, setReactQuill] = useState(null)
  const quillRef = useRef(null)
  const BASE_URL = config.BASE_URL

  // Dynamically import ReactQuill only on client side
  useEffect(() => {
    const loadQuill = async () => {
      if (typeof window !== "undefined") {
        const { default: RQ } = await import("react-quill")
        await import("react-quill/dist/quill.snow.css")
        setReactQuill(() => RQ)
      }
    }
    loadQuill()
  }, [])

  useEffect(() => {
    if (value !== editorHtml) {
      setEditorHtml(value || "")
    }
  }, [value])

  // Custom image handler for uploading images
  const imageHandler = () => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      if (file) {
        try {
          // Show loading state
          const quill = quillRef.current?.getEditor()
          if (!quill) return

          const range = quill.getSelection()
          if (!range) return

          quill.insertText(range.index, "Uploading image...", "user")

          // Upload image using your existing addFile function
          const response = await addFile(file)

          if (response?.status === 201) {
            // Remove loading text
            quill.deleteText(range.index, "Uploading image...".length)

            // Insert the uploaded image
            const imageUrl = `${BASE_URL}/file/${response.data}`
            quill.insertEmbed(range.index, "image", imageUrl, "user")
            quill.setSelection(range.index + 1)
          } else {
            // Remove loading text on error
            quill.deleteText(range.index, "Uploading image...".length)
            alert("Failed to upload image")
          }
        } catch (error) {
          console.error("Error uploading image:", error)
          // Remove loading text on error
          const quill = quillRef.current?.getEditor()
          if (quill) {
            const range = quill.getSelection()
            if (range) {
              quill.deleteText(range.index, "Uploading image...".length)
            }
          }
          alert("Failed to upload image")
        }
      }
    }
  }

  // Memoize modules to prevent re-creation on every render
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ align: [] }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  )

  // Memoize formats to prevent re-creation
  const formats = useMemo(
    () => [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "script",
      "blockquote",
      "code-block",
      "list",
      "bullet",
      "indent",
      "direction",
      "align",
      "link",
      "image",
      "video",
    ],
    [],
  )

  const handleChange = (content, delta, source, editor) => {
    setEditorHtml(content)
    if (onChange) {
      onChange(content)
    }
  }

  // Don't render until ReactQuill is loaded
  if (!ReactQuill) {
    return (
      <div className="wysiwyg-editor-loading">
        <div className="border border-gray-300 rounded p-4 min-h-[300px] flex items-center justify-center">
          <div className="text-gray-500">Loading editor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="wysiwyg-editor">
      <style jsx global>{`
        .ql-editor {
          min-height: 300px !important;
          font-size: 16px;
          line-height: 1.6;
        }
        .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          background: white;
        }
        .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          background: white;
        }
        .ql-editor img {
          max-width: 100%;
          height: auto;
        }
        .ql-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        .ql-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        .ql-editor h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        .ql-editor h4 {
          font-size: 1em;
          font-weight: bold;
          margin: 1.12em 0;
        }
        .ql-editor h5 {
          font-size: 0.83em;
          font-weight: bold;
          margin: 1.5em 0;
        }
        .ql-editor h6 {
          font-size: 0.75em;
          font-weight: bold;
          margin: 1.67em 0;
        }
        .ql-editor p {
          margin: 1em 0;
        }
        .ql-editor ul, .ql-editor ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        .ql-editor blockquote {
          border-left: 4px solid #ccc;
          margin: 1em 0;
          padding-left: 1em;
          font-style: italic;
        }
        .ql-editor code {
          background-color: #f4f4f4;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        .ql-editor pre {
          background-color: #f4f4f4;
          padding: 1em;
          border-radius: 5px;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
        }
        .wysiwyg-content img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
        }
        .wysiwyg-content h1,
        .wysiwyg-content h2,
        .wysiwyg-content h3,
        .wysiwyg-content h4,
        .wysiwyg-content h5,
        .wysiwyg-content h6 {
          margin: 1em 0 0.5em 0;
          font-weight: bold;
        }
        .wysiwyg-content p {
          margin: 1em 0;
          line-height: 1.6;
        }
        .wysiwyg-content ul,
        .wysiwyg-content ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        .wysiwyg-content blockquote {
          border-left: 4px solid #ccc;
          margin: 1em 0;
          padding-left: 1em;
          font-style: italic;
          background-color: #f9f9f9;
        }
        .wysiwyg-content code {
          background-color: #f4f4f4;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        .wysiwyg-content pre {
          background-color: #f4f4f4;
          padding: 1em;
          border-radius: 5px;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          margin: 1em 0;
        }
      `}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ backgroundColor: "white" }}
      />
    </div>
  )
}

export default WysiwygEditor
