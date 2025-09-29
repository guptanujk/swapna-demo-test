<template>
  <q-layout view="hHh lpR fFf">
  <q-header class="custom-nav row">
    <q-toolbar>
      <img src="../assets/images/Qentelli Logo.png" alt="Qentelli Logo" />
      <p>Q-Insurance</p>
    </q-toolbar>
    <q-tabs dense no-caps>
      <q-route-tab class="removeHover" :ripple="false" to="/home" label="Home" v-if="user?.type == 'Agent'"/>
      <q-btn
        label="Apply for Insurance"
        no-caps
        flat
        icon-right="mdi-chevron-down"
        class="removeHover"
        :ripple="false"
        v-if="user?.type == 'Agent'"
      >
        <q-menu class="custom-qmenu">
          <div class="menu-container">
            <div class="row q-gutter-x-sm q-mb-sm">
              <div class="col">
                <div class="card">
                  <p>Vehicles</p>
                  <q-list>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>Automobiles</q-item-section>
                    </q-item>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>Truck</q-item-section>
                    </q-item>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>Bike</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <p>Travel</p>
                  <q-list>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>For a Holiday</q-item-section>
                    </q-item>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>For Business</q-item-section>
                    </q-item>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>For a Student</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </div>
            <div class="row q-gutter-x-sm">
              <div class="col">
                <div class="card">
                  <p>Health</p>
                  <q-list>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>For Individuals</q-item-section>
                    </q-item>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>For a Family</q-item-section>
                    </q-item>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>For a Senior Citizen</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <p>Term</p>
                  <q-list>
                    <q-item clickable dense class="q-px-none removeHover" @click="router.push('/terminsurance')">
                      <q-item-section>Individual</q-item-section>
                    </q-item>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>Joint</q-item-section>
                    </q-item>
                    <q-item clickable dense class="q-px-none removeHover">
                      <q-item-section>Group</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </div>
          </div>
        </q-menu>
      </q-btn>
      <q-route-tab class="removeHover" :ripple="false" to="/policy" label="Policy" v-if="user?.type == 'Agent'" />
      <q-route-tab class="removeHover" :ripple="false" to="/claims" label="Claims" v-if="user?.type == 'Agent'"/>
      <q-route-tab class="removeHover" :ripple="false" to="/dashboard" label="Dashboard" v-if="user?.type !== 'Agent'"/>
      <q-route-tab class="removeHover" :ripple="false" to="/claimsmanagement" label="Claims Management" v-if="user?.type !== 'Agent'"/>
      <q-route-tab class="removeHover" :ripple="false" to="/page6" label="Customer Database" v-if="user?.type !== 'Agent'" />
    </q-tabs>
    <q-space />
    <q-btn flat class="removeHover q-px-none" :ripple="false" icon="mdi-help-circle" />
    <q-btn
      :label="user?.firstName || '' + ' ' + user?.lastName || ''"
      no-caps
      flat
      icon="mdi-account-circle"
      icon-right="mdi-chevron-down"
      class="removeHover"
      :ripple="false"
    >
      <q-menu class="profile-dropdown">
        <q-list>
          <q-item clickable dense>
            <q-item-section>{{ user.email }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable dense class="text-red" @click="logout()">
            <q-item-section>Log Out</q-item-section>
            <q-item-section avatar>
              <q-icon name="mdi-login-variant"  size="16px"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-header>
  <q-page-container>
    <router-view />
  </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user/index.js';
import { useQuasar } from 'quasar';
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useUserStore();
    const $q = useQuasar();
    const user = store.$state.user;
    const logout = () => {
      store.logout().then((res:any)=>{
        if(res.status === 200){
          router.push('/login');
        }
        else{
          $q.notify({
            type: 'negative',
            message: 'Logout Failed. Please try again.'
          });
        }
      });
    };
    store.countries().then((res)=>{
      if(res?.status === 200){
        store.$state.countries = res.data.data.data
      }
    })
    return {
      router,
      logout,
      user
    };
  },
});
</script>
<style lang="scss">
.custom-nav {
  background-color: #fff !important;
  border-bottom: 1px solid #e2e8f0;
  color: #171b33 !important;
  .q-toolbar {
    width: auto !important;
    p {
      font-size: 18px;
      margin: 5px 10px 0px 10px;
    }
  }
  .q-tabs {
    margin-top: 5px;
  }
}
.custom-qmenu {
  width: 320px;
  .menu-container {
    padding: 8px;
  }
}
.card {
  max-width: 200px;
  background-color: #e7f0fb;
  border-radius: 6px;
  padding: 6px;
  p {
    margin-bottom: 0px;
    font-weight: 600;
    color: #0b4ba4;
  }
  .q-item {
    min-height: 28px !important;
  }
}
.profile-dropdown {
}
</style>
