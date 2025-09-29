<template>
  <div class="policyContainer q-mx-md">
    <div class="row justify-between q-mt-md">
      <h1 class="pagetitle">{{ totalCount }} Policies Found</h1>
      <div class="rightelements">
        <div class="row">
          <q-btn
            flat
            :ripple="false"
            size="md"
            class="removeHover"
            color="black"
            icon="mdi-filter-variant"
            @click="openFilter()"
          />
          <q-dialog v-model="filterbutton" class="custom-dialog">
            <q-card style="width: 700px; max-width: 80vw">
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Filter</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup size="sm" />
              </q-card-section>
              <q-card-section>
                <div class="row q-col-gutter-md q-pa-sm">
                  <div class="col">
                    <label for="category">Category</label>
                    <q-select outlined dense v-model="filterCategory" :options="categoryOptions" emit-value 
                      map-options/>
                  </div>
                  <div class="col">
                    <label for="dateofbirth">Created On</label>
                    <q-input 
                      v-model="filterDate" 
                      outlined 
                      dense 
                    >
                      <template #append>
                        <q-icon name="mdi-calendar-blank" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                            class="datePickerMenu"
                          >
                            <q-date v-model="filterDate" mask="YYYY/MM/DD" :options="optionFnVal" minimal>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col">
                    <label for="dateofbirth">Status</label>
                    <q-select
                      outlined
                      v-model="filterStatus"
                      :options="options"
                      option-label="label"
                      option-value="value"
                      emit-value 
                      map-options
                      dense
                      popup-content-class="status-customfilter"
                    >
                      <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps" dense>
                          <q-item-section>
                            <q-item-label>{{ scope.opt.label }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="row items-center q-pb-none justify-end q-col-gutter-x-sm">
                <q-btn
                  flat
                  dense
                  label="Clear"
                  no-caps
                  size="md"
                  class="custombtn close-btn q-mr-sm"
                  @click="resetForm()"
                />
                <q-btn flat dense label="Apply" no-caps size="md" class="custombtn apply-btn" @click="applyFilter"/>
              </q-card-section>
            </q-card>
          </q-dialog>
          <q-input outlined dense v-model="policyPayload.search" placeholder="Search for Policy">
            <template v-slot:prepend>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="row justify-between q-mt-xs">
      <q-markup-table flat bordered>
        <thead>
          <tr>
            <th class="text-left">Policy ID</th>
            <th class="text-left">Category</th>
            <th class="text-left">Policy Name</th>
            <th class="text-left">Created On</th>
            <th class="text-left">Email ID</th>
            <th class="text-left">Phone No.</th>
            <th class="text-center">Status</th>
            <th class="text-left">IRA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(policy,i) in policyList" :key="i">
            <td class="text-left">{{ policy.policyId }}</td>
            <td class="text-left">{{ toTitleCase(policy.policyCategory) }}</td>
            <td class="text-left">{{ toTitleCase(policy.policySubCategory) }}</td>
            <td class="text-left">{{ moment(policy.createdAt).format("YYYY-MM-DD") }}</td>
            <td class="text-left">{{ policy.email }}</td>
            <td class="text-left">{{ policy.phoneNumber }}</td>
            <td class="text-left">
              <q-badge :class="`${policy.status=='active'?'activebadge':'inactivebadge'} custombadge`"> {{ toTitleCase(policy.status) }} </q-badge>
            </td>
            <td class="text-left">
              <q-btn
                flat
                dense
                class="link removeHover"
                :ripple="false"
                no-caps
                label="Claim"
                @click="currentID = policy.id,claimRemarks = '',claimbutton = true"
              />
              <q-btn flat dense icon="mdi-download" class="downloadbtn q-ml-sm" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="row justify-between q-mt-md">
      <div class="col">
        <div class="row items-center">
          <label class="q-mr-sm">Go to page</label>
          <q-select outlined dense v-model="policyPayload.page" :options="pagesList" @update:model-value="getPolicies()"/>
        </div>
      </div>
      <div class="col">
        <div class="row justify-end">
          <q-pagination
            v-model="policyPayload.page"
            :max="pagesCount"
            direction-links
            color="black"
            active-design="orange"
            active-color="orange"
            active-text-color="black"
            @update:model-value="getPolicies()"
          />
        </div>
      </div>
    </div>
    <q-dialog v-model="claimbutton" class="custom-dialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Claim Insurance</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup size="sm" />
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md q-pa-sm">
            <div class="col">
              <label for="remarks">Remarks (Optional)</label>
              <q-input
                v-model="claimRemarks"
                outlined
                class="q-mb-md"
                autogrow
                :shadow-text="textareaShadowText"
              />
              <text-h6 class="text-weight-bold">
                Are you sure you want to claim the insurance?
              </text-h6>
            </div>
          </div>
        </q-card-section>
        <q-card-section
          class="row items-center q-pb-none justify-end q-col-gutter-x-sm"
        >
          <q-btn
            flat
            dense
            v-close-popup
            label="Cancel"
            no-caps
            size="md"
            class="custombtn close-btn q-mr-sm"
          />
          <q-btn
            flat
            dense
            label="Confirm"
            no-caps
            size="md"
            class="custombtn apply-btn"
            @click="submitClaim()"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { onMounted, reactive, ref,watch } from 'vue'
import moment from 'moment'
import { usePolicyStore } from '@/stores/policies'
import { commonFunctions } from '@/common/functions'
export default {
  setup() {
    const policyList = ref([])
    const filterCategory = ref()
    const filterDate = ref()
    const filterStatus = ref()
    const filterbutton = ref(false)
    const claimRemarks = ref('')
    const pagesCount = ref(0)
    const pagesList = ref<Number[]>([])
    const claimbutton = ref(false)
    const currentID = ref()
    const totalCount = ref(0)
    const policyStore = usePolicyStore()
    const debounceTimer = ref();
    const policyPayload = reactive({
      page:1,
      limit:10,
    })
    const options = ref([
      {
        label: 'Active',
        value: 'active',
      },
      {
        label: 'Inactive',
        value: 'inactive',
      },
    ])
    const categoryOptions=ref([
      {label:'Vehicles',value:'vehicles'},
      {label:'Health',value:'health'},
      {label:'Term',value:'term'},
      {label:'Travel',value:'travel'},
    ])
    const { showNotify, toTitleCase } = commonFunctions()
    watch(
      ()=> policyPayload.search,
      (newVal)=>{
        if (debounceTimer.value) {
          clearTimeout(debounceTimer.value);
        }
        debounceTimer.value = setTimeout(() => {
          policyPayload.page = 1
          getPolicies();
        }, 1000);
      }
    )
    const optionFnVal = (date: any) => {
      return date <= moment(new Date()).format("YYYY/MM/DD");
    };
    const openFilter = () =>{
      filterCategory.value = policyPayload.category
      filterDate.value = policyPayload.createdOn
      filterStatus.value = policyPayload.status
      filterbutton.value = true
    }
    const applyFilter = () =>{
      policyPayload.category = filterCategory.value
      policyPayload.createdOn = filterDate.value
      policyPayload.status = filterStatus.value
      if(!policyPayload.search)
      delete policyPayload.search
      if(!policyPayload.category)
      delete policyPayload.category
      if(!policyPayload.createdOn)
      delete policyPayload.createdOn
      if(!policyPayload.status)
      delete policyPayload.status
      filterbutton.value = false
      getPolicies()
    }
    const resetForm = () =>{
      filterCategory.value = null
      filterDate.value = null
      filterStatus.value = null
    }
    const getPolicies = () =>{
      pagesList.value = []
      policyStore.getPolicys(policyPayload).then((res:any)=>{
        if(res?.status === 200){
          policyList.value = res.data.data.policies
          totalCount.value = res.data.data.totalCount
          pagesCount.value = Math.ceil(totalCount.value / policyPayload.limit);
          if(pagesCount.value){
            for(let index = 1;index<=pagesCount.value ;index++){
              pagesList.value.push(index)
            }
          }
        }
        else{
          showNotify('error','Something went wrong while fetching data')
        }
      })
    }
    const submitClaim = () =>{
      let payload = {
        userPolicyId: parseInt(currentID.value),
      }

      if(claimRemarks.value){
        payload.remark = claimRemarks.value
      }
      policyStore.raiseClaim(payload).then((res:any)=>{
        if(res?.status === 200){
          showNotify('success','Claim submitted successfully')
          claimbutton.value = false
        }
        else{
          showNotify('error','Something went wrong while submitting claim')
        }
      })
    }
    onMounted(()=>{
      getPolicies()
    })
    return {
      policyPayload,
      optionFnVal,
      filterbutton,
      claimbutton,
      categoryOptions,
      policyList,
      pagesList,
      pagesCount,
      moment,
      toTitleCase,
      totalCount,
      filterCategory,
      filterDate,
      filterStatus,
      openFilter,
      applyFilter,
      getPolicies,
      options,
      resetForm,
      submitClaim,
      claimRemarks,
      currentID
    }
  },
}
</script>
<style lang="scss">
</style>
<route lang="yaml">
meta:
  layout: navbar
</route>
