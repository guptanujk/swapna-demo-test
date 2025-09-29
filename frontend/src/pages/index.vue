<template>
  <p class="text-h5">Loading...!!</p>
</template>

<script lang="ts">import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { SessionStorageService } from '../common/storage/useStorage'
import { useUserStore } from '../stores//user/index'
import config from '../../config'
export default defineComponent({
  name: 'Landing',
  setup() {
    const router = useRouter()
    const store = useUserStore()
    const go = () => {
      if (store.$state.user && store.$state.user?.token) {
        SessionStorageService.setItem('sessionKey', store.user.token)
        router.push('/dashboard')
      }
      else {
        router.push('/login')
      }
    }
   go()
    return {
     config
    }
  },
})
</script>

<route lang="yaml">
meta:
  layout: default
</route>
