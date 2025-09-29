import { acceptHMRUpdate, defineStore } from 'pinia'
import { actions } from './action'
import { state } from './state'

export const useClaimStore = defineStore('claim', {
  actions,
  state,
})

if (import.meta.hot)
  {import.meta.hot.accept(acceptHMRUpdate(useClaimStore, import.meta.hot))}
