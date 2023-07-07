// Third party
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

const Token = secureLocalStorage.getItem('token')
export const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${Token}`
  },
  withCredentials: true
})
