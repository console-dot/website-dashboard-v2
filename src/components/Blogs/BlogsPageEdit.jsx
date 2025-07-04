"use client"

import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { RiLoader3Line } from "react-icons/ri"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectBlogsDetails } from "../../redux/blogsSlice"
import config from "../../api/config"
import { RxCross1 } from "react-icons/rx"
import { addFile } from "../../api/file"
import { FaPlus } from "react-icons/fa"
import RainbowLoader from "../Loader/RainbowLoader"
import { editBlog, getBlog } from "../../api/blogs"
import WysiwygEditor from "./WysiwygEditor"
// import WysiwygEditor from "./wysiwyg-editor"

export default function BlogsPageEdit() {
  const BASE_URL = config.BASE_URL
  const { id } = useParams()
  const blogsData = useSelector(selectBlogsDetails)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    featuredImage: "",
    category: "",
    tags: [],
    content: "",
    excerpt: "",
    author: "",
    publishDate: "",
    readTime: 1,
    isPublished: false,
    isFeatured: false,
    seoTitle: "",
    seoDescription: "",
    seoKeywords: [],
    relatedPosts: [],
  })

  const [newTags, setNewTags] = useState("")
  const [newSeoKeywords, setNewSeoKeywords] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Load blog data on component mount
  useEffect(() => {
    if (id) {
      getBlog(id)
        .then((res) => {
          const blogData = res?.data?.data || res?.data
          if (blogData) {
            setFormData({
              ...blogData,
              publishDate: blogData.publishDate ? new Date(blogData.publishDate).toISOString().split("T")[0] : "",
              tags: blogData.tags || [],
              seoKeywords: blogData.seoKeywords || [],
            })
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error("Failed to load blog data")
        })
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.title || !formData.content) {
      toast.error("Title and content are required")
      setIsLoading(false)
      return
    }

    editBlog(formData, id)
      .then((res) => {
        console.log("res", res)
        setTimeout(() => {
          setIsLoading(false)
          toast.success("Blog updated successfully", {
            autoClose: 1500,
            onClose: () => navigate("/blogs"),
          })
        }, 1500)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        toast.error("Failed to update blog")
      })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle WYSIWYG content change
  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content: content,
    })
  }

  const handleFeaturedImage = (e) => {
    const newImage = e.target.files[0]
    setIsSubmitting(true)

    addFile(newImage)
      .then((res) => {
        if (res?.status == 201) {
          setFormData((prevData) => ({
            ...prevData,
            featuredImage: res?.data,
          }))
          setTimeout(() => {
            setIsSubmitting(false)
            toast.success("Featured Image Updated Successfully", {
              autoClose: 500,
            })
          }, 500)
        }
      })
      .catch((err) => {
        console.log(err)
        setIsSubmitting(false)
      })
  }

  const handleRemoveFeaturedImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      featuredImage: "",
    }))
  }

  // Tags handling
  const handleNewTagsChange = (e) => {
    setNewTags(e.target.value)
  }

  const handleAddTags = () => {
    if (newTags.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newTags.trim()],
      }))
      setNewTags("")
    }
  }

  const handleRemoveTags = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }))
  }

  // SEO Keywords handling
  const handleNewSeoKeywordsChange = (e) => {
    setNewSeoKeywords(e.target.value)
  }

  const handleAddSeoKeywords = () => {
    if (newSeoKeywords.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        seoKeywords: [...prevData.seoKeywords, newSeoKeywords.trim()],
      }))
      setNewSeoKeywords("")
    }
  }

  const handleRemoveSeoKeywords = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      seoKeywords: prevData.seoKeywords.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="w-full mb-6">
      <form className="flex justify-center flex-col w-[80%] m-auto gap-2" method="post" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-[28px] text-custom-purple mb-4 mt-2 font-bold text-center">Edit Blog Post</h1>

          {/* Title */}
          <label className="text-webDescrip font-semibold">Title *</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formData?.title}
            placeholder="Blog Title"
            required
          />

          {/* Category */}
          <label className="text-webDescrip font-semibold mt-4">Category *</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
            value={formData?.category}
            placeholder="Blog Category"
            required
          />

          {/* Content - WYSIWYG Editor */}
          <label className="text-webDescrip font-semibold mt-4">Content *</label>
          <div className="mt-2">
            <WysiwygEditor
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Write your blog content here. You can format text, add images, links, and more..."
            />
          </div>

          {/* Excerpt */}
          <label className="text-webDescrip font-semibold mt-4">Excerpt</label>
          <textarea
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="excerpt"
            id="excerpt"
            onChange={handleChange}
            value={formData?.excerpt}
            placeholder="Blog Excerpt"
          />

          {/* Author */}
          <label className="text-webDescrip font-semibold mt-4">Author</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="author"
            id="author"
            onChange={handleChange}
            value={formData?.author}
            placeholder="Author Name/ID"
          />

          {/* Publish Date */}
          <label className="text-webDescrip font-semibold mt-4">Publish Date</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            name="publishDate"
            id="publishDate"
            onChange={handleChange}
            value={formData?.publishDate}
          />

          {/* Read Time */}
          <label className="text-webDescrip font-semibold mt-4">Read Time (minutes)</label>
          <input
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            name="readTime"
            id="readTime"
            onChange={handleChange}
            value={formData?.readTime}
            min="1"
            placeholder="Estimated read time in minutes"
          />

          {/* Tags */}
          <div>
            <label className="text-webDescrip font-semibold mt-4">Tags</label>
            <div className="flex justify-between items-center gap-2">
              <input
                className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="tags"
                id="tags"
                onChange={handleNewTagsChange}
                value={newTags}
                placeholder="Add Tag"
              />
              <button type="button" onClick={handleAddTags} className="btn btn-success text-white">
                <FaPlus />
                Add
              </button>
            </div>
            <div className="flex mt-2 flex-wrap">
              {formData.tags?.map((tagsItem, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex justify-center items-center gap-2 bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">
                    <span>{tagsItem}</span>
                    <span className="cursor-pointer" onClick={() => handleRemoveTags(index)}>
                      <RxCross1 />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publication Status */}
          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-webDescrip font-semibold">Published</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-webDescrip font-semibold">Featured</span>
            </label>
          </div>

          {/* SEO Section */}
          <div className="border border-dashed border-custom-purple mt-4 mb-2 p-4">
            <label className="text-custom-purple text-2xl font-semibold">SEO Settings</label>

            {/* SEO Title */}
            <label className="text-webDescrip font-semibold mt-4">SEO Title</label>
            <input
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="seoTitle"
              id="seoTitle"
              onChange={handleChange}
              value={formData?.seoTitle}
              placeholder="SEO Title (max 60 characters)"
              maxLength="60"
            />

            {/* SEO Description */}
            <label className="text-webDescrip font-semibold mt-4">SEO Description</label>
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="seoDescription"
              id="seoDescription"
              onChange={handleChange}
              value={formData?.seoDescription}
              placeholder="SEO Description (max 160 characters)"
              maxLength="160"
            />

            {/* SEO Keywords */}
            <div>
              <label className="text-webDescrip font-semibold mt-4">SEO Keywords</label>
              <div className="flex justify-between items-center gap-2">
                <input
                  className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="seoKeywords"
                  id="seoKeywords"
                  onChange={handleNewSeoKeywordsChange}
                  value={newSeoKeywords}
                  placeholder="Add SEO Keyword"
                />
                <button type="button" onClick={handleAddSeoKeywords} className="btn btn-success text-white">
                  <FaPlus />
                  Add
                </button>
              </div>
              <div className="flex mt-2 flex-wrap">
                {formData.seoKeywords?.map((keyword, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex justify-center items-center gap-2 bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">
                      <span>{keyword}</span>
                      <span className="cursor-pointer" onClick={() => handleRemoveSeoKeywords(index)}>
                        <RxCross1 />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <label className="text-webDescrip font-semibold mt-4">Featured Image</label>
          <div className="flex justify-center gap-6 w-full mt-4">
            {formData?.featuredImage ? (
              <div className="flex">
                <img
                  src={`${BASE_URL}/file/${formData?.featuredImage?._id || formData?.featuredImage}`}
                  style={{ maxWidth: "200px", maxHeight: "150px" }}
                  alt="Featured"
                />
                <span className="cursor-pointer ml-2" onClick={() => handleRemoveFeaturedImage()}>
                  <RxCross1 />
                </span>
              </div>
            ) : null}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFeaturedImage}
            className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Submit button */}
        <div className="w-full flex justify-center items-center mt-4 mb-4">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`text-white text-[16px] w-[300px] h-[48px] px-5 bg-gradient-to-r from-fromclr to-toclr hover:bg-gradient-to-r hover:from-toclr hover:to-fromclr rounded-full flex justify-center items-center focus:outline-none relative`}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <RiLoader3Line className="animate-spin h-5 w-5 mr-3" />
                <span>Updating Blog</span>
              </div>
            ) : (
              <p className="font-Lato text-base font-medium leading-[28px] tracking-normal">Update Blog</p>
            )}
          </button>
          <ToastContainer />
        </div>
      </form>

      {isSubmitting && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <RainbowLoader />
        </div>
      )}
    </div>
  )
}
