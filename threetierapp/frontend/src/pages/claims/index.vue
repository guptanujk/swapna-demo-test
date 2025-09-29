<template>
  <div class="claimsContainer q-mx-md">
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
            @click="filterbutton = true"
          />
          <q-input outlined dense v-model="payload.search" placeholder="Search for Policy">
            <template v-slot:prepend>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </div>
      </div>
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
                @click="props.row.expand = !props.row.expand"
                :icon="props.row.expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              >
              </q-btn>
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ props.row[col.name] }}
            </q-td>
            <q-td auto-width>
              <q-badge :class="`${claimStatusClass(props.row.status)}-badge claims-badge`">{{ claimStatus(props.row.status) }}</q-badge>
            </q-td>
          </q-tr>
          <q-tr v-show="props.row.expand" :props="props" class="progress-container">
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
              <q-select outlined dense v-model="payload.category" :options="categoryOptions" />
            </div>
            <div class="col">
              <label for="dateofbirth">Created On</label>
              <q-input 
                v-model="payload.createdOn" 
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
                      <q-date v-model="payload.createdOn" mask="YYYY/MM/DD" :options="optionFnVal" minimal>
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
                v-model="payload.status"
                :options="options"
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
            v-close-popup
            label="Clear"
            no-caps
            size="md"
            class="custombtn close-btn q-mr-sm"
          />
          <q-btn flat dense label="Apply" no-caps size="md" class="custombtn apply-btn" @click="applyFilter()"/>
        </q-card-section>
      </q-card>
    </q-dialog>
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
  </div>
</template>
<script lang="ts">
import { commonFunctions } from '@/common/functions'
import { useClaimStore } from '../../stores/claims'
import { onMounted, reactive, ref, watch } from 'vue'
import moment from 'moment'
export default {
  setup() {
    const store = useClaimStore()
    const filterbutton = ref(false)
    const claimbutton = ref(false)
    const statusfilter = ref(null)
    const hidePagination = ref(true)
    const remarkslogbutton = ref(false)
    const progress = ref(1)
    const currentPage = ref(1)
    const gotopageOptions = ref<Number[]>([])
    const currentID = ref<number>()
    const remarksList = ref([])
    const debounceTimer = ref();
    const totalCount = ref()
    const pagesCount = ref()
    const gotopage = ref(null)
    const category = ref(null)
    const textareaModel = ref('')
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
    const columns = [
      {
        name: "policyId",
        required: true,
        label: "Policy ID",
        align: "left",
        field: "policyId",
      },
      {
        name: "policyCategory",
        align: "left",
        label: "Category",
        field: "policyCategory",
      },
      {
        name: "policySubCategory",
        align: "left",
        label: "Policy Name",
        field: "policySubCategory",
      },
      {
        name: "startDate",
        align: "left",
        label: "Policy Start Date",
        field: "startDate",
      },
      {
        name: "endDate",
        align: "left",
        label: "Policy End Date",
        field: "endDate",
      },
    ];

    const rows = ref([])
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
                            startDate: moment(element.startDate).format("YYYY-MM-DD"),
                            endDate: moment(element.endDate).format("YYYY-MM-DD"),
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
      filterbutton.value = false
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
    watch(
      ()=> payload.search,
      (newVal)=>{
        if (debounceTimer.value) {
          clearTimeout(debounceTimer.value);
        }
        debounceTimer.value = setTimeout(() => {
          payload.page = 1
          getClaimsList();
        }, 1000);
      }
    )
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
      let payload = {
        remark: textareaModel.value,
        claimId: parseInt(currentID.value),
      }
      store.addRemark(payload).then((response:any)=>{
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
    onMounted(() => {
      getClaimsList()
    })
    return {
      filterbutton,
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
      enterRemark
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
