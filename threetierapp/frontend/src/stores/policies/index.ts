import { acceptHMRUpdate, defineStore } from 'pinia'
import { actions } from './action'
import { state } from './state'

export const usePolicyStore = defineStore('policy', {
  actions,
  state,
})

if (import.meta.hot)
  {import.meta.hot.accept(acceptHMRUpdate(usePolicyStore, import.meta.hot))}
