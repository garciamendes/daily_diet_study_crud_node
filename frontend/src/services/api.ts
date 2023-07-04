// Third party
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

export const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const AuthTokenHeader = secureLocalStorage.getItem('token')