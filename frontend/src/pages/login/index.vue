<template>
  <main id="mainContent" class="main-content window-height" qe-id="main-content">
    <div class="row items-center window-height justify-center" qe-id="main-inner">
      <div class="col-6 relative-position">
        <div class="img-container">
          <img src="../../assets/images/Login.png" alt="Login" qe-id="login-image" />
        </div>
        <div class="top-title absolute">
          <h1>Q-Insurance</h1>
        </div>
        <div class="bottom-title absolute">
          <h1>Secure Access to Your Insurance World</h1>
          <p>Smarter Insurance, Seamless Access</p>
        </div>
      </div>
      <div class="col-4">
        <div class="row items-center justify-center">
          <div class="col-8">
            <div class="row items-center q-gutter-y-sm">
              <div class="col-12 text-center">
                <img src="../../assets/images/Qentelli Logo.png" alt="Qentelli Logo" />
              </div>
              <div class="col-12 text-center">
                <div class="surfacebg">Log into your Account</div>
              </div>
              <q-form @submit.prevent="login()" class="col-12">
                <div class="col-12">
                  <label for="username" class="q-mb-xs block">Username</label>
                  <q-input
                    outlined
                    class="full-width"
                    v-model="userName"
                    :rules="[required,...emailRulesNew]"
                    dense
                    placeholder="Enter here..."
                    no-error-icon
                  />
                </div>
                <div class="col-12">
                  <label for="password" class="q-mb-xs block">Password</label>
                  <q-input
                    v-model="password"
                    outlined
                    dense
                    placeholder="Enter here..."
                    :type="isPwd ? 'password' : 'text'"
                    :rules="[required,...passwordRules]"
                    no-error-icon
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                        size="18px"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-9">
                      <q-btn flat :ripple="false" label="Forgot Password?" class="primary-btn-color removeHover q-px-none" no-caps />
                      </div>
                    <div class="col row justify-end">
                      <q-btn class="primary-btn" unelevated no-caps label="Login" type="submit" />
                    </div>
                  </div>
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { useQuasar } from 'quasar'
import { required,emailRulesNew,passwordRules } from '../../support/formRules'

export default defineComponent({
  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const password = ref('')
    const userName = ref('')
    const isPwd = ref(true)
    const store = useUserStore()
    const login = () =>{
       store.login({email:userName.value,password:password.value}).then((res:any)=>{
        if(res.status === 200){
          if(res.data.data.type === 'Agent')
            router.push('/home')
          else
          router.push('/dashboard')
        }
        else{
          $q.notify({
            type: 'negative',
            message: 'Login Failed. Please check your credentials.'
          })
        }
       })
    }
    return {
      password,
      userName,
      isPwd,
      router,
      login,
      required,
      emailRulesNew,
      passwordRules
    }
  }
})
</script>

<style lang="scss">
.main-content {
  width: 100%;
  .img-container {
    max-width: 680px;
    img {
      width: 100%;
    }
  }
  .surfacebg {
    width: 100%;
    background-color: #f5f5fb;
    font-size: 16px;
    padding: 3px;
    border-radius: 4px;
  }
  .top-title {
    top: 20px;
    left: 22%;
    background-color: #E7E7F1B2;
    padding: 8px 32px;
    border-radius: 12px;
    h1 {
      font-size: 52px;
      font-weight: 600;
      line-height: 0;
    }
  }
  .bottom-title {
    bottom: 20px;
    left: 45px;
    background-color: #E7E7F1B2;
    padding: 8px 32px;
    border-radius: 12px;
    h1 {
      font-size: 28px;
      font-weight: 600;
      line-height: 0;
    }
    p {
      text-align: center;
      font-size: 18px;
    }
  }
  .q-field {
    &__control {
      padding: 0px;
    }
    &__native {
      padding-left: 12px;
      padding-right: 12px;
      margin-left: 1px;
      margin-right: 1px;
    }
    &__append {
      padding-right: 12px;
    }
  }
}
.q-field--outlined .q-field__native:-webkit-autofill, .q-field--outlined .q-field__input:-webkit-autofill {
  margin-top: 2px;
  margin-bottom: 2px;
}


</style>
<route lang="yaml">
meta:
  layout: default
</route>
