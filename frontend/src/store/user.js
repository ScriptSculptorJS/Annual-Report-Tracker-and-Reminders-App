import {create} from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  loginUser: async (newUser) => {

    console.log(newUser.email, newUser.password, 'before fetch');

    // Helps to store the access and refresh tokens in the cookies
    axios.defaults.withCredentials = true;

    try {

      const res = await axios.post('http://localhost:5001/api/auth', newUser);

      const data = res.data;
      console.log(data);

      if (data.data) {
        return { success: data.success, message: 'User created successfully', data: data.data };
      } else {
        return { success: data.success, message: data.message, status: data.status };
      }

    } catch (err) {

      console.log('What is the error:', err);

      return { message: err.response.data.message, status: err.response.status }

    }
  },
  createUser: async (newUser) => {
    try {
     
      const res = await axios.post('http://localhost:5001/api/users', newUser);

      const data = res.data;

      console.log(res);

      if (data.user) {
        return { success: data.success, message: 'User created successfully', data: data.user };
      } else {
        return { success: data.success, message: data.message, status: data.status };
      }

    } catch (err) {

      console.log('Error in creating user: ', err);

    }
  },
  checkAccess: async () => {

    axios.defaults.withCredentials = true;

    try {
      
      const res = await axios.get('http://localhost:5001/api/users');
    
      if (res.data.valid) {

        return { valid: true, success: true, message: res.data.message };

      } else {

        return { valid: false, success: false, message: res.data.message };

      }

    } catch (err) {

      console.log('Error collecting user data');

    }
  }
}));