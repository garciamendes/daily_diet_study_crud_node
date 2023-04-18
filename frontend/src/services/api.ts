// Third party
import axios from 'axios'
import queryString from 'query-string'
import { isEmpty } from 'lodash'

// const authToken = localStorage.getItem('token')
// export const requests = axios.create({
//   baseURL: 'http://localhost:3001',
//   headers: {
//     'Authorization': `Token ${authToken}`,
//     'Content-Type': 'application/json'
//   }
// })

// export const api = {
//   get(url, params={}, filters={}, config={}) {
//     url = `${url}/${params}`
//     const search = queryString.stringify(filters)
//     if (!isEmpty(search))
//       url = `${url}?${search}`
//     return requests.get(url, config)
//   },

//   post(url, params={}, data, config={}) {
//     url = url = `${url}/${params}`
//     return requests.post(url, data, config)
//   },

//   put(url, params, data, config={}) {
//     url = url = `${url}/${params}`
//     return requests.put(url, data, config)
//   },

//   patch(url, params, data, config={}) {
//     url = url = `${url}/${params}`
//     return requests.patch(url, data, config)
//   },

//   delete(url, params, config={}) {
//     url = url = `${url}/${params}`
//     return requests.delete(url, config)
//   }
// }

export const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const AuthTokenHeader = localStorage.getItem('token')