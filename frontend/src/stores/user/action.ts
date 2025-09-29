import type { AxiosResponse, AxiosError } from 'axios'
import type { _ActionsTree } from 'pinia'
import UseAxios from '../../common/http/ApiService'
import { useUserStore } from '../user/index'
import { LocalStorageService, SessionStorageService } from '../../common/storage/useStorage'
const api = new UseAxios()

export const actions: IUserActions = {
  async login(payLoad: any): Promise<any> {
    return api.save('/user/login', payLoad).then((res: AxiosResponse) => {
      const userStore = useUserStore()
      userStore.$state.token = res.data.data.token
      SessionStorageService.setItem('sessionKey', res.data.data.token)
      userStore.$state.user = res.data.data
      return res
    }, (err: AxiosError) => err.response)
  },
  async logout(): Promise<any> {
    return api.save('/user/logout').then((res:AxiosResponse) => {
      const userStore = useUserStore()
      userStore.$state.token = ''
      userStore.$state.user= {}
      SessionStorageService.clear()
      LocalStorageService.clear()
      return res
    }, (err:AxiosError) => err.response) 
  },
  async countries() {
    return  api.findAll('/common/countries').then((res: AxiosResponse) => res, err => err.response)
  },
  async states(payLoad){
    return api.findAll(`/common/states?countryId=${payLoad}`).then((res:AxiosResponse) => res, err => err.response)
  }
}
interface IUserActions extends _ActionsTree {
    login(payLoad: any): Promise<AxiosResponse | undefined>
    logout(): Promise<AxiosResponse | undefined>
    countries(): Promise<AxiosResponse | undefined>
    states(payLoad: any): Promise< AxiosResponse | undefined>
}