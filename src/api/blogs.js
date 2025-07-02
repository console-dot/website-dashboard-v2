// Add these API functions to your existing API file

const API_BASE_URL = "http://localhost:5000/api/v1" // Replace with your actual API base URL

// Get all blogs
export const getBlogs = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE_URL}/blogs?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    })

    if (response.status === 403) {
      return 403
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching blogs:", error)
    throw error
  }
}

// Get single blog
export const getBlog = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching blog:", error)
    throw error
  }
}

// Get blog by slug
export const getBlogBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching blog by slug:", error)
    throw error
  }
}

// Create new blog
export const addBlog = async (blogData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating blog:", error)
    throw error
  }
}

// Update blog
export const editBlog = async (blogData, id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error updating blog:", error)
    throw error
  }
}

// Delete blog
export const removeBlog = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header
        // 'Authorization': `Bearer ${token}`,
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error deleting blog:", error)
    throw error
  }
}

// Get popular blogs
export const getPopularBlogs = async (limit = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/popular?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching popular blogs:", error)
    throw error
  }
}

// Get recent blogs
export const getRecentBlogs = async (limit = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/recent?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching recent blogs:", error)
    throw error
  }
}

// Search blogs
export const searchBlogs = async (searchParams) => {
  try {
    const queryString = new URLSearchParams(searchParams).toString()
    const response = await fetch(`${API_BASE_URL}/blogs/search?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error searching blogs:", error)
    throw error
  }
}
