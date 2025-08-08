import {create} from 'zustand'
import axios from 'axios'
import dotenv from 'dotenv'

export const useUserStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  loginUser: async (newUser) => {

    // Helps to store the access and refresh tokens in the cookies
    axios.defaults.withCredentials = true

    try {

      console.log(newUser)

      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth`, newUser)

      const data = res.data

      if (data.data) {

        return { success: data.success, message: 'User created successfully', data: data.data }

      } else {

        return { success: data.success, message: data.message, status: data.status }

      }

    } catch (err) {

      console.log('What is the error:', err);

      return { message: err.response.data.message, status: err.response.status }

    }
  },
  createUser: async (newUser) => {
    try {
     
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, newUser)

      const data = res.data

      if (data.user) {

        return { success: data.success, message: 'User created successfully', data: data.user }

      } else {

        return { success: data.success, message: data.message, status: data.status }

      }

    } catch (err) {

      console.log('Error in creating user: ', err)

    }
  },
  checkAccess: async () => {

    axios.defaults.withCredentials = true

    try {
      
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
    
      if (res.data.valid) {

        return { valid: true, success: true, message: res.data.message }

      } else {

        return { valid: false, success: false, message: res.data.message }

      }

    } catch (err) {

      console.log('Error collecting user data')

    }
  }, 
  updateUser: async (entity, requestType) => {

    axios.defaults.withCredentials = true

    try {

      const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
        newObject: entity,
        requestType
      })

      return res

    } catch (err) {

      console.log(err)

    }
  },
  createEntity: async (entity) => {

    axios.defaults.withCredentials = true
   
    try {

      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/entities`, entity)

      const data = res.data

      return { success: data.success, message: data.message, data: data.data, status: data.status }

    } catch (err) {

      console.log('What is the error:', err)

      return { message: err.response.data.message, status: err.response.status }

    }
  },
  updateEntity: async (entity, index, completed) => {

    axios.defaults.withCredentials = true

    try {

      const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/entities`, { entity, index, completed })

      const data = res.data

      return { success: data.success, message: data.message, data: data.data }

    } catch (err) {

      console.log('error message when creating entity:', err)

      return { message: err.response.data.message, status: err.response.status }

    }
  },
  deleteEntity: async (entityId) => {

    axios.defaults.withCredentials = true

    try {

      const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/entities/:id`, {entityId})

      const data = res.data

      return { success: data.success, message: data.message, data: data.data, status: data.status }

    } catch (err) {

      console.log('What is the error:', err)

      return { message: err.response.data.message, status: err.response.status }

    }
  },
  logOutUser: async () => {

    axios.defaults.withCredentials = true

    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`)
        console.log(res)

        return {loggedOut: res.data.loggedOut}

    } catch (err) {

      console.log('What is the error:', err)
    }
  }
}))