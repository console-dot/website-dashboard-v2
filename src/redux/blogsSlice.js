// Add this Redux slice for blog management

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  blogs: [],
  selectedBlog: null,
  heroDescription: null,
  loading: false,
  error: null,
}

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogsData: (state, action) => {
      state.blogs = action.payload
    },
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload
    },
    setHeroDescriptionData: (state, action) => {
      state.heroDescription = action.payload
    },
    addBlogToList: (state, action) => {
      state.blogs.push(action.payload)
    },
    updateBlogInList: (state, action) => {
      const index = state.blogs.findIndex((blog) => blog._id === action.payload._id)
      if (index !== -1) {
        state.blogs[index] = action.payload
      }
    },
    removeBlogFromList: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setBlogsData,
  setSelectedBlog,
  setHeroDescriptionData,
  addBlogToList,
  updateBlogInList,
  removeBlogFromList,
  setLoading,
  setError,
  clearError,
} = blogsSlice.actions

// Selectors
export const selectBlogsDetails = (state) => state.blogs.blogs
export const selectSelectedBlog = (state) => state.blogs.selectedBlog
export const selectHeroDescription = (state) => state.blogs.heroDescription
export const selectBlogsLoading = (state) => state.blogs.loading
export const selectBlogsError = (state) => state.blogs.error

export default blogsSlice.reducer
