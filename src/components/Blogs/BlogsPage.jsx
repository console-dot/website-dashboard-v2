

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
// import { editHeroDescription, getHeroDescription, getBlogs } from "../../api"
import { BlogCard } from "./BlogCard"
import { FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"
import RainbowLoader from "../Loader/RainbowLoader"
import { selectBlogsDetails, setBlogsData, setHeroDescriptionData } from "../../redux/blogsSlice"
import { editHeroDescription, getHeroDescription } from "../../api"
import { getBlogs } from "../../api/blogs"

export const BlogsPage = ({ setIsValid, isValid }) => {
  const [herodata, setHeroData] = useState(null)
  const [blogHero, setBlogHero] = useState("")
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const blogs = useSelector(selectBlogsDetails)

  const handleHeroDescription = async (e) => {
    e.preventDefault()
    try {
      const res = await editHeroDescription({ blogHero }, herodata._id)
      setBlogHero(res?.blogHero)
      getHeroDescription()
        .then((res) => {
          setHeroData(res?.data)
          dispatch(setHeroDescriptionData(res?.data))
        })
        .catch((err) => console.log(err))
      alert("Hero description updated successfully!")
    } catch (err) {
      alert("Failed to update hero description")
    }
  }

  // Fetch blogs data
  useEffect(() => {
    getBlogs()
      .then((res) => {
        if (res == 403) {
          setIsValid(false)
        }
        setData(res?.data?.blogs || res?.data)
        dispatch(setBlogsData(res?.data?.blogs || res?.data))
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    console.log("isValid", isValid)
    if (!isValid) {
      toast.warning("Your Session has been Expired. Please Login Again", {
        autoClose: 1500,
        onClose: () => {},
      })
    }
  }, [location.pathname, isValid])

  useEffect(() => {
    setData(blogs)
  }, [blogs])

  // Fetch hero description data
  useEffect(() => {
    getHeroDescription()
      .then((res) => {
        setHeroData(res?.data)
        dispatch(setHeroDescriptionData(res?.data))
      })
      .catch((err) => console.log(err))
  }, [dispatch])

  useEffect(() => {
    setBlogHero(herodata?.blogHero)
  }, [herodata])

  if (!data) {
    return <RainbowLoader />
  }

  return (
    <>
      <div
        className="w-[90%] m-auto"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="text-black text-2xl font-bold">Blogs Management</h2>
        <button
          type="button"
          onClick={() => {
            navigate(`/blogs-new`)
          }}
          className="text-white btn btn-success flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Blog
        </button>
      </div>

      <div
        className="w-[90%] m-auto"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* hero description */}
        {/* <div className="flex flex-col" style={{ width: "100%" }}>
          <label className="" style={{ color: "grey" }}>
            Blog Hero Description
          </label>
          <div className="flex flex-row gap-2">
            <textarea
              className="bg-white shadow-lg text-webDescrip px-3 text-[16px] border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="heroDescription"
              id="heroDescription"
              onChange={(e) => {
                setBlogHero(e.target.value)
              }}
              value={blogHero}
              placeholder="Blog Hero Description"
            />
            <button
              className="bg-blue-500 text-white py-1 px-6 rounded-lg"
              type="button"
              onClick={handleHeroDescription}
            >
              Update
            </button>
          </div>
        </div> */}
      </div>

      <div className="w-[90%] m-auto px-4 py-4 bg-backgroundColor my-3 border border-dashed border-[#0E7789] rounded-md">
        <div className="flex">
          <div className="flex flex-col w-full">
            {data ? <BlogCard data={data} herodata={herodata} /> : <p>Loading blogs...</p>}
          </div>
        </div>
      </div>
    </>
  )
}
