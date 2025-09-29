/* eslint-disable no-console */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../../../config.js';
import {SessionStorageService } from '../storage/useStorage.js';
import { useUserStore } from '../../stores/user/index.js';
class ApiService<T> {
  service: AxiosInstance
  constructor() {
    this.service = axios.create({
      baseURL: config.baseURL,
    })
    // request interceptor
    this.service.interceptors.request.use(
      this.requestHandleSuccess.bind(this),
      this.requestHandleError.bind(this),
    )

    // response interceptor
    this.service.interceptors.response.use(
      this.responseHandleSuccess.bind(this),
      this.responseHandleError.bind(this),
    )
  }

  save(path: string, payLoad?: T): Promise<AxiosResponse> {
    return this.service.post<AxiosResponse<T>>(path, payLoad)
  }

  saveWithParams(path: string, payLoad: object, params: object): Promise<AxiosResponse> {
    return this.service.post(path, payLoad, params)
  }

  savefile(path: string, formData: object, configVal: AxiosRequestConfig | undefined): Promise<AxiosResponse> {
    this.service.defaults.headers.common['Content-Type']
      = 'multipart/form-data'
    return this.service.post(path, formData, configVal)
  }

  update(path: string, payLoad: object): Promise<AxiosResponse> {
    return this.service.put(path, payLoad)
  }

  findByParams(path: string, params: object): Promise<AxiosResponse> {
    return this.service.get(path, params)
  }

  findAll(path: string): Promise<AxiosResponse> {
    return this.service.get(path)
  }

  delete(path: string, params?: object, payLoad?: object): Promise<AxiosResponse> {
    return this.service.delete(path, { params, data: payLoad })
  }

  setCustomHeaders(key: string, value: string) {
    this.service.defaults.headers.post[key] = value
  }

  async requestHandleSuccess(ConfigVal: any) {
    const session: any = SessionStorageService.getItem('sessionKey')
    ConfigVal.headers = { token: session || null }
    return ConfigVal
  }

  requestHandleError(error: AxiosError) {
    return Promise.reject(error)
  }

  responseHandleSuccess(response: AxiosResponse) {
    return response
  }

  responseHandleError(error: AxiosError) {
    const store = useUserStore()
    const code400 = 400;
    const code401 = 401;
    const code403 = 403;
    const code404 = 404
    switch (error.response?.status) {
      case code400:
        break
      case code401:
        localStorage.clear()
        sessionStorage.clear()
        window.location.replace(`${window.location.origin}/login`)
        break
      case code403:
        localStorage.clear()
        sessionStorage.clear()
        window.location.replace(`${window.location.origin}/login`)
        break
      case code404:
        break
      case 406:
        localStorage.clear()
        sessionStorage.clear()
        window.location.replace(`${window.location.origin}/login`)
        break
      default:
        break
    }
    return Promise.reject(error)
  }
}
export default ApiService
