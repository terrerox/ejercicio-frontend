import axios from 'axios'
import { authHeader } from './authHeader'

export const httpClient = axios.create({
  baseURL: 'https://apidev.kanvas.dev/v2'
})

httpClient.interceptors.request.use(config => {
  config.headers = authHeader()
  return config
})

httpClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  return error.response
})