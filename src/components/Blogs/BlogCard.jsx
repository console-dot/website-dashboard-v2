
import { useState } from "react"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"
import { FaPen, FaTrash } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { setBlogsData } from "../../redux/blogsSlice"
import config from "../../api/config"
// import { getBlogs, removeBlog } from "../../api"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Accordian from "./Accordian"
import { getBlogs, removeBlog } from "../../api/blogs"

export const BlogCard = ({ data, herodata }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [blogHero, setBlogHero] = useState(herodata?.blogHero || "")
  const BASE_URL = config.BASE_URL

  const handleEditClick = (itemData) => {
    dispatch(setBlogsData(itemData))
    navigate(`/blogsEdit/edit/${itemData._id}`)
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(removeBlog(id))
      getBlogs()
        .then((res) => {
          dispatch(setBlogsData(res?.data))
        })
        .catch((err) => console.log(err))
      toast.success("Blog deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete blog")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div>
      <div style={{ gap: "20px" }} className="flex flex-wrap justify-center">
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((itemData, index) => (
            <Accordian key={index} title={itemData?.title}>
              <div className="m-2">
                <div className="bg-dark rounded border-secondary text-white p-3">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="w-full flex flex-col justify-between mt-[10px]">
                      <div className="w-full flex flex-col gap-2">
                        {/* heading */}
                        <h1 className="text-heading text-xl font-bold">{itemData.title}</h1>

                        {/* slug */}
                        <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                          <div className="w-[50%]">
                            <strong style={{ color: "grey" }}> Slug: </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className="text-black text-sm">{itemData.slug}</span>
                          </div>
                        </div>

                        {/* category */}
                        <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                          <div className="w-[50%]">
                            <strong style={{ color: "grey" }}> Category: </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className="text-black text-sm">{itemData.category}</span>
                          </div>
                        </div>

                        {/* tags */}
                        <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                          <div className="w-[50%]">
                            <strong style={{ color: "grey" }}> Tags: </strong>
                          </div>
                          <div className="w-[50%] flex flex-col">
                            {itemData.tags?.map((tag, index) => (
                              <span key={index} className="text-black text-sm block">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* excerpt */}
                        <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                          <div className="w-[50%]">
                            <strong style={{ color: "grey" }}> Excerpt: </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className="text-black text-sm">{itemData.excerpt}</span>
                          </div>
                        </div>

                        {/* content preview */}
                        <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                          <div className="w-[50%]">
                            <strong style={{ color: "grey" }}> Content: </strong>
                          </div>
                          <div className="w-[50%] h-36 overflow-hidden hover:overflow-y-scroll">
                            <span className="text-black text-sm">{itemData.content?.substring(0, 200)}...</span>
                          </div>
                        </div>

                        {/* publish info */}
                        <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                          <div className="w-[50%]">
                            <strong style={{ color: "grey" }}> Status: </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className={`text-sm ${itemData.isPublished ? "text-green-500" : "text-red-500"}`}>
                              {itemData.isPublished ? "Published" : "Draft"}
                            </span>
                          </div>
                        </div>

                        {/* publish date */}
                        <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                          <div className="w-[50%]">
                            <strong style={{ color: "grey" }}> Publish Date: </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className="text-black text-sm">{formatDate(itemData.publishDate)}</span>
                          </div>
                        </div>

                        {/* read time */}
                        <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                          <div className="w-[50%]">
                            <strong style={{ color: "grey" }}> Read Time: </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className="text-black text-sm">{itemData.readTime} min</span>
                          </div>
                        </div>

                        {/* views and likes */}
                        <div className="flex border-b border-solid border-custom-purple" style={{ width: "70%" }}>
                          <div className="w-[50%]">
                            <strong style={{ color: "grey" }}> Views: </strong>
                          </div>
                          <div className="w-[50%]">
                            <span className="text-black text-sm">{itemData.views || 0}</span>
                          </div>
                        </div>

                        {/* SEO fields */}
                        <div
                          className="flex flex-col border-b border-solid border-custom-purple"
                          style={{ width: "70%" }}
                        >
                          <span className="text-custom-purple font-extrabold">SEO Information</span>
                          <div className="flex flex-row">
                            <div className="w-[50%] flex flex-col">
                              <strong style={{ color: "grey" }}>SEO Title:</strong>
                            </div>
                            <div className="w-[50%]">
                              <span className="text-black text-sm">{itemData?.seoTitle || "Not set"}</span>
                            </div>
                          </div>
                          <div className="flex flex-row">
                            <div className="w-[50%] flex flex-col">
                              <strong style={{ color: "grey" }}>SEO Description:</strong>
                            </div>
                            <div className="w-[50%]">
                              <span className="text-black text-sm">{itemData?.seoDescription || "Not set"}</span>
                            </div>
                          </div>
                          <div className="flex flex-row mb-2">
                            <div className="w-[50%] flex flex-col">
                              <strong style={{ color: "grey" }}>SEO Keywords:</strong>
                            </div>
                            <div className="w-[50%]">
                              <span className="text-black text-sm">
                                {itemData?.seoKeywords?.join(", ") || "Not set"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Featured Image */}
                        {itemData?.featuredImage && (
                          <div>
                            <div
                              className="flex border-b border-solid border-custom-purple flex-col"
                              style={{ width: "70%" }}
                            >
                              <span className="text-custom-purple font-extrabold">Featured Image</span>
                              <div className="flex justify-center items-center mx-auto w-[50%]">
                                <img
                                  src={`${BASE_URL}/file/${itemData?.featuredImage?._id}`}
                                  alt={itemData.title}
                                  style={{
                                    maxWidth: "300px",
                                    maxHeight: "200px",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="w-full flex flex-row justify-center items-center mt-3">
                      <div className="w-[80%] flex justify-around">
                        <Button icon={<FaPen />} text={"Edit"} click={() => handleEditClick(itemData)} />
                        <Button icon={<FaTrash />} text={"Delete"} click={() => handleDelete(itemData._id)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Accordian>
          ))}
      </div>
    </div>
  )
}
