<template>
  <div class="claimsContainer q-mx-md">
    <div class="row justify-between q-mt-md">
      <h1 class="pagetitle">Filter Claims</h1>
    </div>
    <div class="row justify-between items-end">
      <div class="col-8">
        <div class="row q-col-gutter-x-sm">
          <div class="col">
            <label for="status">Status</label>
            <q-select 
              outlined 
              dense 
              v-model="payload.status" 
              :options="options"
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
          <div class="col">
            <label for="policyType">Policy Type</label>
            <q-select outlined dense v-model="payload.category" :options="categoryOptions" />
          </div>
          <div class="col">
            <label for="dateofbirth">Date</label>
            <q-input v-model="payload.createdOn" outlined dense placeholder="Select Date">
              <template #append>
                <q-icon name="mdi-calendar-blank" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                    class="datePickerMenu"
                  >
                    <q-date v-model="payload.createdOn" mask="YYYY/MM/DD" :options="optionFnVal" minimal>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col">
            <label for="claimID" class="text-no-wrap inline-block">Search Claim ID or Customer's Name</label>
            <q-input outlined dense v-model="text" placeholder="Search ">
              <template v-slot:prepend>
                <q-icon name="mdi-magnify" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <div class="col text-right">
        <q-btn
          flat
          dense
          v-close-popup
          label="Apply Filter"
          no-caps
          :ripple="false"
          size="md"
          class="primary-btn q-px-md q-mr-sm"
          :disabled="btnDisabled()"
          @click="applyFilter()"
        />
        <q-btn
          flat
          dense
          v-close-popup
          label="Clear Filter"
          no-caps
          :ripple="false"
          size="md"
          class="clearfilter-btn q-px-md"
          :disabled="btnDisabled()"
          @click="clearFilter()"
        />
      </div>
    </div>
    <div class="row justify-between q-mt-md">
      <h1 class="pagetitle">Claims Overview</h1>
    </div>
    <div class="row justify-between q-mt-xs">
      <q-table
        flat
        bordered
        :hide-pagination="hidePagination"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[10]"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width></q-th>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width class="text-left">Status</q-th>
            <q-th auto-width class="text-left">Action</q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                dense
                flat
                :ripple="false"
                class="removeHover"
                @click="props.expand = !props.expand"
                :icon="props.expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              >
              </q-btn>
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td auto-width class="text-center">
              <q-icon name="mdi-close-circle" color="red" size="18px" class="cursor-pointer" v-if="props.row.status === 'Rejected'">
                <q-tooltip> Rejected </q-tooltip>
              </q-icon>
              <q-icon
                name="mdi-check-circle"
                color="green"
                size="18px"
                class="cursor-pointer"
                v-if="props.row.status === 'Closed'"
              >
                <q-tooltip> Approved </q-tooltip>
              </q-icon>
              <q-icon
                name="mdi-timer-outline"
                color="orange"
                size="18px"
                class="cursor-pointer"
                v-if="props.row.status !== 'Closed' && props.row.status !== 'Rejected'"
              >
                <q-tooltip> Pending </q-tooltip>
              </q-icon>
            </q-td>
            <q-td auto-width>
              <span class="text-grey text-weight-bold" v-if="props.row.status === 'Closed'">Claim Closed</span>
              <span class="text-grey text-weight-bold" v-if="props.row.status === 'Rejected'">Claim Rejected</span>
              <div class="row">
                <div class="col" v-if="props.row.status === 'Submitted'">
                  <q-btn
                    dense
                    v-close-popup
                    label="Approve"
                    no-caps
                    :ripple="false"
                    size="md"
                    class="primary-btn q-px-md q-mr-sm"
                    @click="updateStatus(props.row.id, 'Approved')"
                  />
                  <q-btn
                    dense
                    v-close-popup
                    label="Reject"
                    color="white"
                    text-color="red"
                    no-caps
                    :ripple="false"
                    size="md"
                    class="q-px-md"
                    @click="updateStatus(props.row.id, 'Rejected')"
                  />
                </div>
                <div class="col" v-else-if="props.row.status === 'Approved'">
                  <q-btn
                    dense
                    v-close-popup
                    label="Issue Claim"
                    no-caps
                    :ripple="false"
                    size="md"
                    class="primary-btn q-px-md q-mr-sm"
                    @click="updateStatus(props.row.id, 'Claim Issued')"
                  />
                </div>
                <div class="col" v-else-if="props.row.status === 'Claim Issued'">
                  <q-btn
                    dense
                    v-close-popup
                    label="Close Claim"
                    no-caps
                    :ripple="false"
                    size="md"
                    class="primary-btn q-px-md q-mr-sm"
                    @click="updateStatus(props.row.id, 'Closed')"
                  />
                </div>
              </div>
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props" class="progress-container">
            <q-td colspan="100%" class="q-td--no-hover">
              <div class="q-pa-sm customexpand">
                <h6 class="expand-head">Progress</h6>
                <div class="row justify-between">
                  <div class="col-5">
                    <div class="progress">
                      <q-stepper v-model="progress" ref="stepper" color="primary" flat dense>
                        <q-step
                          :name="1"
                          title="Claim Submitted"
                          caption="21/06/2025"
                          icon="img:images/ClaimClosed.png"
                          active-icon="img:images/ClaimSubmitted.png"
                          done-icon="img:images/ClaimApproved.png"
                          :done="progress > 1"
                        >
                        </q-step>
                        <q-step
                          :name="2"
                          title="Approved"
                          caption="23/06/2025"
                          icon="img:images/ClaimClosed.png"
                          active-icon="img:images/ClaimSubmitted.png"
                          done-icon="img:images/ClaimApproved.png"
                          :done="progress > 2"
                        >
                        </q-step>
                        <q-step
                          :name="3"
                          title="Claim Issued"
                          caption="27/06/2025"
                          icon="img:images/ClaimClosed.png"
                          active-icon="img:images/ClaimSubmitted.png"
                          done-icon="img:images/ClaimApproved.png"
                          :done="progress > 3"
                        >
                        </q-step>
                        <q-step
                          :name="4"
                          title="Closed"
                          caption="28/06/2025"
                          icon="img:images/ClaimClosed.png"
                          active-icon="img:images/ClaimSubmitted.png"
                          done-icon="img:images/ClaimApproved.png"
                          :done="progress > 4"
                        >
                        </q-step>
                      </q-stepper>
                    </div>
                  </div>
                  <div class="col text-end">
                    <div class="row justify-end">
                      <q-btn
                        flat
                        dense
                        no-caps
                        :ripple="false"
                        class="removeHover remark-btn"
                        label="View Remarks Log"
                        icon="mdi-sticker-text"
                        @click="fetchRemarks(props.row.id)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div class="row justify-between q-mt-md">
      <div class="col">
        <div class="row items-center">
          <label class="q-mr-sm">Go to page</label>
          <q-select outlined dense v-model="payload.page" :options="gotopageOptions" @update:model-value="getClaimsList()"/>
        </div>
      </div>
      <div class="col">
        <div class="row justify-end">
          <q-pagination
            v-model="payload.page"
            :max="pagesCount"
            :rows-per-page="10"
            direction-links
            color="black"
            active-design="orange"
            active-color="orange"
            active-text-color="black"
            @update:model-value="getClaimsList()"
          />
        </div>
      </div>
    </div>
    <q-dialog v-model="remarkslogbutton" class="custom-dialog">
      <q-card style="width: 500px; max-width: 80vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Remark Log</div>
          <q-space />
          <q-btn
            icon="close"
            label="Close"
            class="removeHover"
            no-caps
            flat
            round
            dense
            v-close-popup
            size="sm"
          />
        </q-card-section>
        <q-card-section style="max-height: 50vh" class="scroll custom-timeline">
          <q-timeline layout="loose" side="right">
            <q-timeline-entry v-for="value in remarksList" :key="value.id">
              <template v-slot:title>
                <div class="row justify-between">
                  <div class="col">{{ value.user }}</div>
                  <div class="col text-right" v-if="value.status">
                    <q-badge :class="`claims-badge ${claimStatusClass(value.status)}-badge`"
                      >{{ value.status }}</q-badge
                    >
                  </div>
                </div>
              </template>
              <template v-slot:subtitle>
                {{ moment(value.createdAt).format("DD MMM") }}
                <span class="year">{{ moment(value.createdAt).format("YYYY") }}</span>
              </template>
              <div>
                {{ value.remarks }}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="textareaModel"
            outlined
            class="q-mb-md"
            type="textarea"
            rows="3"
            placeholder="Enter text here..."
            :shadow-text="textareaShadowText"
            @keydown="processTextareaFill"
            @focus="processTextareaFill"
          />
          <div class="row justify-end">
            <q-btn
              flat
              dense
              label="Enter"
              no-caps
              size="md"
              class="enterbtn"
              :disabled="!textareaModel.trim()"
              @click="enterRemark()"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="claimbutton" class="custom-dialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ currentStatus === 'Approved'?'Approve':'Reject' }} Claim</div>
          <q-space />
          <q-btn
            icon="close"
            label="Close"
            class="removeHover"
            no-caps
            flat
            round
            dense
            v-close-popup
            size="sm"
          />
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md q-pa-sm">
            <div class="col">
              <label for="remarks">Remarks (Optional):</label>
              <q-input
                v-model="remarkText"
                outlined
                class="q-mb-md"
                autogrow
                :shadow-text="textareaShadowText"
              />
              <text-h6 class="text-weight-bold">
                What would you like to approve this claim?
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
            class="custom-btn clearfilter-btn q-mr-sm"
          />
          <q-btn
            flat
            dense
            label="Confirm"
            no-caps
            size="md"
            :loading="loading"
            class="custombtn primary-btn"
            @click="statusUpdateApi()"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { useClaimStore } from '@/stores/claims'
import { commonFunctions } from '@/common/functions'
import { ref, onMounted, reactive } from 'vue'
import moment from 'moment'
export default {
  setup() {
    const store = useClaimStore()
    const claimbutton = ref(false)
    const statusfilter = ref(null)
    const hidePagination = ref(true)
    const remarkslogbutton = ref(false)
    const progress = ref(1)
    const currentPage = ref(1)
    const gotopageOptions = ref<Number[]>([])
    const currentID = ref<number>()
    const loading = ref(false)
    const currentStatus = ref()
    const remarksList = ref([])
    const totalCount = ref()
    const pagesCount = ref()
    const gotopage = ref(null)
    const category = ref(null)
    const textareaModel = ref('')
    const remarkText = ref('')
    const payload = reactive({
      page: 1,
      limit: 10,
    });
    const date = ref('')
    const categoryOptions = [
      'Vehicles',
      'Health',
      'Term',
      'Travel',
    ]
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
    const rows = ref([])
    const columns = [
      {
        name: 'Policy ID',
        required: true,
        label: 'Policy ID',
        align: 'left',
        field: 'policyId'
      },
      { name: 'policyCategory', align: 'left', label: 'Category', field: 'policyCategory' },
      { name: 'policySubCategory', align: 'left', label: 'Policy Name', field: 'policySubCategory' },
      {
        name: 'date',
        align: 'left',
        label: 'Date of Claims',
        field: 'date',
      },
      { name: 'email', align: 'left', label: 'Email ID', field: 'email' },
      { name: 'phone', align: 'left', label: 'Phone No', field: 'phone' },
      { name: 'coverageAmount', align: 'left', label: 'Claim Amount', field: 'coverageAmount' },
    ]
    const { showNotify, toTitleCase } = commonFunctions()
    const getClaimsList = () => {
      if(payload.category === null || payload.category === ''){
        delete payload.category
      }
      if(payload.status === null || payload.status === ''){
        delete payload.status
      }
      if(payload.createdOn === null || payload.createdOn === ''){
        delete payload.createdOn
      }
      if(payload.search === null || payload.search === ''){
        delete payload.search
      }
      gotopageOptions.value = []
      store.fetchClaims(payload).then((response) => {
        if(response?.status === 200){
          if(response?.data.data.claims.length){
             rows.value = response?.data.data.claims.map((element: any) => ({
                            id: element.id,
                            policyId: element.policyId,
                            policyCategory: toTitleCase(element.policyCategory),
                            policySubCategory: toTitleCase(element.policySubCategory),
                            date: moment(element.createdAt).format("YYYY-MM-DD"),
                            email: element.email,
                            phone: element.phoneNumber,
                            coverageAmount: element.coverageAmount,
                            expand: false,
                            status: element.status,
                          }));
          }
          else{
            rows.value = []
          }
          totalCount.value = response?.data.data.totalCount
          pagesCount.value = Math.ceil(totalCount.value / payload.limit)
          if(pagesCount.value){
            for(let index = 1;index<=pagesCount.value ;index++){
              gotopageOptions.value.push(index)
            }
          }
        }
        else{
          showNotify('error','Error while fetching claims list')
        }
      })
    }
    const optionFnVal = (date: any) => {
      return date <= moment(new Date()).format("YYYY/MM/DD");
    };
    const applyFilter = () => {
      payload.page = 1
      getClaimsList()
    }
    const claimStatus = (status:any) =>{
      switch(status){
        case 'Submitted':
          return 'Claim Submitted'
        case 'Approved':
          return 'Claim Approved'
        case 'Rejected':
          return 'Claim Rejected'
        case 'Closed':
          return 'Claim Closed'
        case 'Claim Issued':
          return 'Claim Issued'
        default:
          return status
      }
    }
    const claimStatusClass = (status:any) =>{
      switch(status){
        case 'Submitted':
          return 'claimsubmitted'
        case 'Approved':
          return 'claimissued'
        case 'Rejected':
          return 'claimrejected'
        case 'Closed':
          return 'claimclosed'
        case 'Claim Issued':
          return 'claimissued'
        default:
          return status
      }
    }
    const fetchRemarks = (claimId:number) =>{
      currentID.value = claimId
      store.fetchRemarks(claimId).then((response)=>{
        if(response?.status === 200){
          remarksList.value = []
          remarksList.value = response.data.data.remarks
        }
        else{
          remarksList.value = []
          showNotify('error','Error while fetching remarks log')
        }
      })
      remarkslogbutton.value = true
    }
    const enterRemark = () =>{
      let remarkPayload = {
        remark: textareaModel.value,
        claimId: parseInt(currentID.value),
      }
      store.addRemark(remarkPayload).then((response:any)=>{
        if(response?.status === 200){
          showNotify('success','Remark added successfully')
          textareaModel.value = ''
          fetchRemarks(currentID.value)
        }
        else{
          showNotify('error','Error while adding remark')
        }
      })
    }
    const updateStatus = (claimId:number, status:string) =>{
      remarkText.value = ''
      currentID.value = claimId
      currentStatus.value = status
      if(status === 'Approved' || status === 'Rejected'){
       claimbutton.value = true
      }
      else{
        statusUpdateApi()
      }
    }
    const statusUpdateApi = () =>{
      loading.value = true
      let newPayload = {
        status: currentStatus.value,
        claimId: parseInt(currentID.value)
      }
      if(remarkText.value){
        newPayload['remark'] = remarkText.value
      }
      store.updateStatus(newPayload).then((response:any)=>{
        if(response?.status === 200){
          showNotify('success','Status updated successfully')
          payload.page = 1
          getClaimsList()
          loading.value = false
          claimbutton.value = false
        }
        else{
          showNotify('error','Error while updating status')
          loading.value = false
          claimbutton.value = false
        }
      })
    }
    const clearFilter = () =>{
      payload.status = null
      payload.category = null
      payload.createdOn = null
      payload.search = null
      payload.page = 1
      getClaimsList()
    }
    const btnDisabled = () =>{
      return !payload.status && !payload.category && !payload.createdOn && !payload.search
    }
    onMounted(() => {
      getClaimsList()
    })
    return {
      claimbutton,
      date,
      category,
      gotopage,
      gotopageOptions,
      currentPage,
      columns,
      rows,
      progress,
      remarkslogbutton,
      hidePagination,
      categoryOptions,
      statusfilter,
      options,
      payload,
      claimStatus,
      totalCount,
      pagesCount,
      claimStatusClass,
      optionFnVal,
      applyFilter,
      getClaimsList,
      fetchRemarks,
      remarksList,
      moment,
      textareaModel,
      enterRemark,
      updateStatus,
      statusUpdateApi,
      remarkText,
      currentStatus,
      loading,
      clearFilter,
      btnDisabled
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
