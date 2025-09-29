import { acceptHMRUpdate, defineStore } from 'pinia'
import { actions } from './action'
import { state } from './state'

export const useUserStore = defineStore('user', {
  actions,
  state,
})

if (import.meta.hot)
  {import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))}
