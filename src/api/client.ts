import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '../store/authStore'

export type ApiErrorShape = {
  message: string
  statusCode?: number
  details?: unknown
}

export type ApiError = AxiosError<ApiErrorShape>

const client: AxiosInstance = axios.create({
  baseURL: 'https://2ppcf4sc-4000.inc1.devtunnels.ms/api',
  timeout: 15000,
})

client.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`)
  }
  return config
})

export default client

// Debug logs 
client.interceptors.response.use(
  (response) => {
    try {
      const method = response.config?.method?.toUpperCase()
      const url = response.config?.url
      console.log(`[API] ${method} ${url} -> ${response.status}`)
    } catch {}
    return response
  },
  (error: ApiError) => {
    try {
      const method = error.config?.method?.toUpperCase()
      const url = error.config?.url
      const status = error.response?.status
      const data = error.response?.data
      // eslint-disable-next-line no-console
      console.log(`[API ERROR] ${method} ${url} -> ${status}`, data)
    } catch {}
    return Promise.reject(error)
  }
)

