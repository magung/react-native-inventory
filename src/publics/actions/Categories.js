import Axios from 'axios'
import {URL} from '../config'
//import { AsyncStorage } from 'react-native'
//import DeviceStorage from '../DeviceStorage'

//const token = AsyncStorage.getItem("token")
//Axios.defaults.baseURL = 'http://localhost:8080';

 Axios.defaults.baseURL = `${URL}`;
// export const getCategories = (query) => {
//     const {search , sortBy, sort, page, limit } = query
//     return {
//         type: 'GET_CATEGORIES',
//         payload: Axios.get(`/categories/?search=${search}&sortBy=${sortBy}&sort=${sort}&page=${page}&limit=${limit}`)
//     }
// }
export const getCategories = (query) => {
    const {search} = query
    return {
        type: 'GET_CATEGORIES',
        payload: Axios.get(`/categories/?search=${search}`)
    }
}
export const getCategoryById = (id) => {
    return {
        type: 'GET_CATEGORY_BY_ID',
        payload: Axios.get(`/categories/` + id)
    }
}
//
export const addCategory = (data, headers) => {
  return {
      type: 'ADD_CATEGORY',
      payload: Axios.post('/categories', data, {
          headers:headers
      })

  }
}
//
export const updateCategory = (id, data, headers) => {
  return{
      type: 'UPDATE_CATEGORY',
      payload: Axios.patch(`/categories/` + id, data, {
          headers:headers
      })
  }
}
export const deleteCategory = (id, header) => {
  return{
    type: 'DELETE_CATEGORY',
    payload: Axios.delete(`/categories/${id}`, {
      headers: header
    })
  }
}
