import axios from "axios";

// Your API base URL
const originalServerUrl = 'https://blogapp-ampm.onrender.com'
let serverurl = originalServerUrl;
// Function to check if the server is reachable
const checkServerStatus = async () => {
  try {
    await axios.get(`${serverurl}/status`, { timeout: 5000 })
    console.log('Server is reachable')
    serverurl=originalServerUrl;
    return true
  } catch (error) {
    
    console.log('Server is not reachable', error.message)
    return false
  }
}

// Check server status and update serverurl
const updateServerUrl = async () => {
  const serverIsRunning = await checkServerStatus()
  if (!serverIsRunning) {
    serverurl = ''
  }
  serverurl=originalServerUrl;
}

// Initialize and export the API instance
const initializeApi = async () => {
  await updateServerUrl()

  const api = axios.create({
    baseURL: serverurl,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => Promise.reject(error)
  )

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        console.log('Unauthorized request')
      }
      return Promise.reject(error)
    }
  )

  return api
}

// Initialize and export the apiMultipart instance
const initializeApiMultipart = async () => {
  await updateServerUrl()

  const apiMultipart = axios.create({
    baseURL: serverurl,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  apiMultipart.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => Promise.reject(error)
  )

  apiMultipart.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        console.log('Unauthorized request')
      }
      return Promise.reject(error)
    }
  )

  return apiMultipart
}

// Export promises that resolve to the initialized API instances
const apiPromise = initializeApi()
const apiMultipartPromise = initializeApiMultipart()

export { apiPromise, apiMultipartPromise, serverurl }
