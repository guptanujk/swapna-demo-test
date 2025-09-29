<template>
  <div class="banner relative-position">
    <img src="../../assets/images/TermInsuranceBanner.png" alt="Term Insurance Banner" />
    <q-btn flat icon="mdi-arrow-left" no-caps class="removeHover backbtn text-weight-medium" :ripple="false"
      label="Go Back to Home" @click="router.push('/dashboard')" />
    <h1>Individual Term Insurance</h1>
  </div>
  <div class="q-mx-md">
    <q-form @submit="handleSubmit()" ref="mainform">
      <q-stepper v-model="step" :ripple="false" vertical color="primary" animated header-nav flat keep-alive>
        <q-step :name="1" title="01" :ripple="false" caption="Insured Person Details"
          icon="img:images/InactiveStepper.png" inactive-icon="img:images/InactiveStepper.png"
          active-icon="img:images/InProgressStepper.png" done-icon="img:images/CompleteStepper.png" :done="step > 1">
          <div class="row q-col-gutter-md">
            <div class="col-3">
              <label for="fullname">Full Name<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.fullName" dense placeholder="Enter here..." :rules="[required]"
                no-error-icon hide-bottom-space />
            </div>
            <div class="col-3">
              <label for="dateofbirth">Date of Birth<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input 
                v-model="form.dob" 
                outlined 
                dense 
                :rules="[validateAge]" 
                no-error-icon
                hide-bottom-space
              >
                <template #append>
                  <q-icon name="mdi-calendar-blank" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                      class="datePickerMenu"
                    >
                      <q-date v-model="form.dob" mask="YYYY/MM/DD" :options="optionFn" minimal>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-3">
              <label for="gender">Gender<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense v-model="form.gender" :options="genderOptions" :rules="[required]" no-error-icon
                hide-bottom-space />
            </div>
            <div class="col-3">
              <label for="occupation">Occupation<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense v-model="form.occupation" :options="occupationOptions" :rules="[required]"
                no-error-icon hide-bottom-space />
            </div>
            <div class="col-3">
              <label for="annualIncome">Annual Income (Rs.)<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.annualIncome" dense placeholder="Enter here..." hide-bottom-space
                :rules="[required]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="existingInsurance">Any Existing Insurance Policies Currently?<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense v-model="form.existingInsurance" option-label="label" option-value="value"
                emit-value map-options :options="booleanOptions" no-error-icon hide-bottom-space />
            </div>
            <div class="col-3" v-if="form.existingInsurance">
              <label for="alcholComsumption">Existing Insurance Details<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.existingInsuranceDetails" dense placeholder="Enter here..."
                hide-bottom-space :rules="[required,maxLength]" no-error-icon/>
            </div>
            <div class="col-3" v-if="false">
              <label for="existingInsurance">Select Identity Proof Type<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense v-model="form.proofType" option-label="label" option-value="value"
                :options="proofOptions" :rules="[required]" emit-value map-options no-error-icon hide-bottom-space />
            </div>
            <div class="col-3" v-if="false">
              <label for="existingInsurance">Upload Proof <span class="text-grey">(.pdf, .jpg)</span> <span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-file outlined dense v-model="upload" placeholder="Select Document" />
            </div>
          </div>
        </q-step>
        <q-step :name="2" title="02" caption="Policy Type Selection" icon="img:images/InactiveStepper.png"
          inactive-icon="img:images/InactiveStepper.png" active-icon="img:images/InProgressStepper.png"
          done-icon="img:images/CompleteStepper.png" :done="step > 2" @click="stepClicked(2)">
          <div class="row q-col-gutter-md">
            <div class="col-3">
              <label for="desiredpolicyterm">Desired Policy Term<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense v-model="form.desiredPolicyTerm" :options="desiredpolicytermOptions"
                :rules="[required]" no-error-icon hide-bottom-space emit-value map-options />
            </div>
            <div class="col-3">
              <label for="startdate">Start Date<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input 
                v-model="form.startDate" 
                outlined dense 
                :rules="[required]" 
                no-error-icon
                hide-bottom-space 
                :disable="!form.desiredPolicyTerm" 
              >
                <template #append>
                  <q-icon name="mdi-calendar-blank" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                      class="datePickerMenu"
                    >
                      <q-date v-model="form.startDate" mask="YYYY/MM/DD" :options="optionFnVal" minimal @update:model-value="updateEndDate(form.startDate)">
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-3">
              <label for="enddate">End Date<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input 
               v-model="form.endDate"
               outlined dense
               :rules="[required]" 
               no-error-icon
               hide-bottom-space 
               :disable="true" 
              >
                <template #append>
                  <q-icon name="mdi-calendar-blank" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                      class="datePickerMenu"
                    >
                      <q-date v-model="form.endDate" mask="YYYY/MM/DD" :options="optionFnVal" minimal>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-3">
              <label for="typeofpolicy">Type of Policy<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense v-model="form.typeOfPolicy" :options="typeofpolicyOptions" :rules="[required]"
                no-error-icon hide-bottom-space emit-value map-options />
            </div>
            <div class="col-3">
              <label for="desiredcoverageamount">Desired Coverage Amount<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined option-label="label" option-value="value" emit-value map-options dense
                v-model="form.desiredCoverageAmount" :options="desiredcoverageamountOptions" :rules="[required]"
                no-error-icon hide-bottom-space />
            </div>
            <!-- <div class="col-3">
              <label for="ridersaddons">Riders/Add-ons</label>
              <q-select outlined dense v-model="ridersaddons" :options="ridersaddonsOptions" />
            </div> -->
            <div class="col-3">
              <label for="annualIncome">Annual Premium Amount<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.premium" dense :rules="[required]"
                no-error-icon hide-bottom-space />
            </div>
          </div>
        </q-step>
        <q-step :name="3" title="03" caption="Beneficiary Details" icon="img:images/InactiveStepper.png"
          inactive-icon="img:images/InactiveStepper.png" active-icon="img:images/InProgressStepper.png"
          done-icon="img:images/CompleteStepper.png" :done="step > 3" @click="stepClicked(3)">
          <div class="row q-col-gutter-md" v-for="(element, i) in form.beneficiaryDetails" :key="i">
            <div class="col-3">
              <label for="primarybeneficiaryname">Primary Beneficiary Name<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="element.beneficiaryName" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required,maxLength]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="phonenumber">Phone Number<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="element.beneficiaryPhone" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required, phoneValid]"  type="Number" no-error-icon @keydown="updated($event)"/>
            </div>
            <div class="col-3">
              <label for="phonenumber">Email<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="element.beneficiaryEmail" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required, emailRulesNew]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="relationshiptoinsured">Relationship to Insured<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined dense v-model="element.beneficiaryRelation" placeholder="Enter Here..."
                hide-bottom-space :rules="[required,minMaxLength]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="startdate">Date Of Birth of the Beneficiary<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-input 
                v-model="element.beneficiaryDob" 
                outlined 
                dense 
                hide-bottom-space 
                :rules="[required]"
                no-error-icon 
              >
                <template #append>
                  <q-icon name="mdi-calendar-blank" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                      class="datePickerMenu"
                    >
                      <q-date v-model="element.beneficiaryDob" mask="YYYY/MM/DD" :options="optionFn" minimal>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-3" v-if="false">
              <label for="share">% Share (if multiple beneficiaries)</label>
              <q-select outlined dense v-model="element.beneficiaryShare" :options="shareOptions" hide-bottom-space
                emit-value map-options />
            </div>
            <!-- <div class="col-3">
              <label for="secondarybeneficiary">Secondary Beneficiary (Optional)</label>
              <q-input outlined v-model="secondarybeneficiary" dense placeholder="Enter Here..." />
            </div> -->
          </div>
        </q-step>
        <q-step :name="4" title="04" caption="Medical Information" icon="img:images/InactiveStepper.png"
          inactive-icon="img:images/InactiveStepper.png" active-icon="img:images/InProgressStepper.png"
          done-icon="img:images/CompleteStepper.png" :done="step > 4" @click="stepClicked(4)">
          <div class="row q-col-gutter-md">
            <div class="col-3">
              <label for="height">Height (in cm/ft)<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.height" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="weight">Weight (kg/ibs)<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.weight" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="medicalHistory">Medical History<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense v-model="form.medicalHistory" :options="medicalhistoryOptions" hide-bottom-space
                :rules="[required]" no-error-icon emit-value map-options />
            </div>
            <div class="col-3">
              <label for="currentMedications">Current Medications<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.currentMedications" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="familyhistory">Family History of Diseases<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined dense v-model="form.historyOfFamilyDiseases" placeholder="Enter Here..."
                hide-bottom-space :rules="[required]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="surgeries">Surgeries of Hospitalisations in Past 5 Years<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense v-model="form.surgeriesPast5Years" option-label="label" option-value="value"
                :options="booleanOptions" hide-bottom-space no-error-icon emit-value map-options />
            </div>
            <div class="col-3">
              <label for="doctorscontact">Doctor's Contact (Optional)</label>
              <q-input outlined v-model="form.doctorsContact" dense placeholder="Enter Here..." hide-bottom-space />
            </div>
            <div class="col-3">
              <label for="consentmedicalexam">Consent to Medical Exam<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense v-model="form.consentToMedicalExam" option-label="label" option-value="value"
                :options="booleanOptions" hide-bottom-space emit-value map-options :rules="[required]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="somkingStatus">Smoking Status<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense v-model="form.smokingStatus" option-label="label" option-value="value"
                :options="booleanOptions" :rules="[required]" no-error-icon hide-bottom-space emit-value map-options />
            </div>
            <div class="col-3">
              <label for="alcholComsumption">Alcohol Consumption<span
                  class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined v-model="form.alcoholConsumption" dense option-label="label" option-value="value"
                :options="booleanOptions" :rules="[required]" no-error-icon hide-bottom-space emit-value map-options />
            </div>
            <div class="col-3">
              <label for="alcholComsumption">Health Conditions<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.healthCondition" dense placeholder="Enter here..." hide-bottom-space
                :rules="[required,maxLength]" no-error-icon />
            </div>
          </div>
          <div class="row justify-between items-center q-my-sm" v-if="false">
            <label>Media</label>
            <q-btn label="Add Media" icon="mdi-plus" size="md" flat dense :ripple="false" class="removeHover mediabtn"
              no-caps />
          </div>
          <div class="row" v-if="false">
            <div class="media-item row justify-between items-center q-mr-xs q-mb-xs">
              <div>
                <img src="/images/PDF.png" alt="PDF" />
                <span>Picture 01</span>
              </div>
              <div>
                <q-btn icon="mdi-eye" flat dense size="sm" :ripple="false" class="removeHover" />
                <q-btn icon="mdi-delete" flat dense size="sm" :ripple="false" class="removeHover" />
              </div>
            </div>
          </div>
        </q-step>
        <q-step :name="5" title="05" caption="Contact Address" icon="img:images/InactiveStepper.png"
          inactive-icon="img:images/InactiveStepper.png" active-icon="img:images/InProgressStepper.png"
          done-icon="img:images/CompleteStepper.png" :done="step > 5" @click="stepClicked(5)">
          <div class="row q-col-gutter-md">
            <div class="col-3">
              <label for="emailid">Email ID<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.email" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required, emailRulesNew]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="permentaddress">Street Address 01<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.addressLine1" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required,maxLength]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="permentaddress2">Street Address 02</label>
              <q-input outlined v-model="form.addressLine2" dense placeholder="Enter Here..." :rules="[maxLength]" hide-bottom-space />
            </div>
            <div class="col-3">
              <label for="country">Country<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense option-label="name" option-value="id" v-model="form.countryId"
                :options="countriesList" @update:model-value="fetchStates(form.countryId)" hide-bottom-space
                :rules="[required]" emit-value map-options no-error-icon />
            </div>
            <div class="col-3">
              <label for="stateprovince">State/Province<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-select outlined dense option-label="name" option-value="id" v-model="form.stateId"
                :options="statesList" hide-bottom-space :rules="[required]" emit-value map-options no-error-icon />
            </div>
            <div class="col-3">
              <label for="city">City<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.city" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required,minMaxLength]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="postalzipcode">Postal/ZIP Code<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.zipCode" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required,zipLength]" no-error-icon />
            </div>
            <div class="col-3">
              <label for="phonenumber">Phone Number<span class="text-red q-ml-xs mandatory">*</span></label>
              <q-input outlined v-model="form.phoneNumber" dense placeholder="Enter Here..." hide-bottom-space
                :rules="[required, phoneValid]" type="Number" no-error-icon @keydown="updated($event)"/>
            </div>
          </div>
        </q-step>
      </q-stepper>
      <div class="row justify-end q-mb-md">
        <q-btn class="primary-btn" unelevated no-caps label="Submit" type="submit" @click="validateForm()" :loading="loading"/>
      </div>
    </q-form>
  </div>
</template>
<script lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { required, emailRulesNew, phoneValid, maxLength, minMaxLength, zipLength } from '@/support/formRules'
import { useUserStore } from '@/stores/user'
import { usePolicyStore } from '@/stores/policies'
import { commonFunctions } from '../../common/functions/index'
import moment from "moment";
export default {
  setup() {
    const router = useRouter()
    const store = useUserStore()
    const policyStore = usePolicyStore()
    const loading = ref(false)
    let ageVal = 0
    const countriesList = ref(store.$state.countries)
    const { showNotify } = commonFunctions()
    const mainform = ref()
    const statesList = ref([])
    const stepsList = ref<Number[]>([1, 2, 3, 4, 5])
    const requiredSteps = ref<Number[]>([1])
    const genderOptions = ref(['Male', 'Female'])
    const occupationOptions = ref(['Employee', 'Public Official', 'Farmer', 'Unemployed'])
    const medicalhistoryOptions = ref(['Diabetes', 'Heart Disease', 'Hypertension', 'Cancer'])
    const familyhistoryOptions = ref(['Diabetes', 'Heart Disease', 'Cancer', 'None'])
    const booleanOptions = ref([{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }])
    const desiredpolicytermOptions = ref([
      { label: '1 Year', value: 1 },
      { label: '2 Years', value: 2 },
      { label: '3 Years', value: 3 },
      { label: '5 Years', value: 5 },
      { label: '10 years', value: 10 },
      { label: '15 Years', value: 15 },
      { label: '20 Years', value: 20 },
      { label: '25 Years', value: 25 },
      { label: '30 Years', value: 30 }
    ])
    const typeofpolicyOptions = ref(['Level Term', 'Decreasing Term', 'Increasing Term', 'Convertible Term', 'Renewable Term', 'Return of Premium'])
    const desiredcoverageamountOptions = ref([
      { label: 'Fifty Lakhs', value: 5000000 },
      { label: 'Seventy Lakhs', value: 7000000 },
      { label: 'One Crore', value: 10000000 },
      { label: 'Two Crores', value: 20000000 },
      { label: 'Three Crores', value: 30000000 },
      { label: 'Four Crores', value: 40000000 },
      { label: 'Five Crores', value: 50000000 }
    ])
    const proofOptions = ref(['Aadhar Card', 'PAN Card'])
    const step = ref(1)
    const form = reactive({
      beneficiaryDetails: [
        {
          beneficiaryName: '',
          beneficiaryRelation: '',
          beneficiaryDob: '',
          beneficiaryPhone: '',
          beneficiaryEmail: '',
          beneficiaryShare: ''
        }
      ]
    })
    const invalidChars = ["-", "+", "e", "."];

    const updated = (val: any) => {
      if (invalidChars.includes(val.key)) val.preventDefault();
    };
    const stepClicked = (val: Number) => {
      if (!requiredSteps.value.includes(val))
        requiredSteps.value.push(val)
    }
    const fetchStates = (countryId: any) => {
      store.states(countryId).then((res) => {
        if (res?.status === 200) {
          statesList.value = res.data.data.data
        }
        else {
          showNotify('error', 'something went wrong while fetching states')
        }
      })
    }
    const handleSubmit = async () => {
      let validateFormVal = await validateForm()
      form.policyCategory = 'term'
      form.policySubCategory = 'individual'
      if (validateFormVal) {
        loading.value = true
        if(!form.doctorsContact)
        delete form.doctorsContact
        if(!form.addressLine2)
        delete form.addressLine2
        policyStore.policyCreate(form).then((res: any) => {
          if (res?.status === 200) {
            showNotify('success', 'policy created successfully')
            loading.value = false
            mainform.value?.reset()
            router.push('/policy')
          }
          else{
            showNotify('error', 'Error while creating term insurance')
            loading.value = false
          }
        })
      }
      else {
        showNotify('error', 'Make sure all the required fields are filled')
      }
    }
    const validateForm = async () => {
      const allExist = stepsList.value.every((num: Number) => requiredSteps.value.includes(num))
      if (!allExist) {
        showNotify('error', 'Make sure all the required fields are filled')
        return
      }
      const valid = await mainform.value.validate()
      if (valid)
        return true
      else
        showNotify('error', 'Make sure all the required fields are filled')
    }
    const updateEndDate = (val: any) => {
      let endDate = moment(val, 'YYYY/MM/DD').add(form?.desiredPolicyTerm, 'years').format('YYYY/MM/DD');
      form.endDate = endDate
    }
    const optionFn = (date: any) => {
      return date <= moment(new Date()).format("YYYY/MM/DD");
    };
    const optionFnVal = (date: any) => {
      return date >= moment(new Date()).format("YYYY/MM/DD");
    };
    const getAge = (birthDate:any) => {
      const today = new Date()
      const dobDate = new Date(birthDate)
      let age = today.getFullYear() - dobDate.getFullYear()
      const m = today.getMonth() - dobDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--
      }
      return age
    }
    const validateAge = (val:any) => {
      if (!val) return 'This field is required'
      ageVal = getAge(val)
      if (ageVal < 20 || ageVal > 60) {
        return 'Age must be between 20 and 60'
      }
      return true
    }
    const coverageFactors = {
      "5000000": 0.31,
      "7000000": 0.44,
      "10000000": 0.63,
      "20000000": 1.0,
      "30000000": 1.44,
      "40000000": 1.88,
      "50000000": 2.31,
    };
    const calculatePremiumAmount = () => {
      const BASE_PREMIUM = 16000;
      const coverageFactor = coverageFactors[form.desiredCoverageAmount];
      const ageFactor = ageVal;
      const premium = BASE_PREMIUM * coverageFactor * ageFactor;
      const PremiumAmount: number = Math.round(premium / 500) * 500;
      return PremiumAmount;
    };
    watch(
      () => [form.desiredCoverageAmount, ageVal],
      async() => {
        if (form.desiredCoverageAmount && ageVal) {
          form.premium = await calculatePremiumAmount();
        } else {
          form.premium = null;
        }
      }
    )
    return {
      step,
      genderOptions,
      occupationOptions,
      medicalhistoryOptions,
      familyhistoryOptions,
      booleanOptions,
      router,
      form,
      desiredpolicytermOptions,
      typeofpolicyOptions,
      desiredcoverageamountOptions,
      required,
      countriesList,
      fetchStates,
      statesList,
      handleSubmit,
      mainform,
      upload: ref(null),
      proofOptions,
      loading,
      validateForm,
      stepClicked,
      updateEndDate,
      optionFn,
      validateAge,
      updated,
      optionFnVal
    }
  },
}
</script>

<style lang="scss">
.q-stepper__tab {
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.q-stepper__dot {
  background-color: transparent;

  .q-icon {
    width: 1.4em;
    height: 1.4em;
  }
}

.q-stepper--vertical .q-stepper__step {
  padding: 5px;
}

.q-stepper--vertical .q-stepper__dot:after,
.q-stepper--vertical .q-stepper__dot:before {
  display: none;
}

.q-stepper__tab::after {
  font-family: 'Material Design Icons';
  content: '\F0140';
  display: inline-block;
  position: absolute;
  right: 20px;
  top: 13px;
  font-size: 22px;
  color: #323f4e;
}

.q-stepper__tab--active::after {
  transform: rotate(180deg);
}

.q-stepper {
  padding-top: 0px;

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: #171b33;
  }

  &__caption {
    font-size: 13px;
    color: #171b33;
  }
}

.q-stepper--vertical .q-stepper__step-inner {
  margin: 10px 0px 5px 0px;
  background-color: #fffae9;
  padding: 14px;
  border-radius: 6px;

  .q-field {
    &__control {
      background-color: #fff !important;
    }
  }

  label {
    font-size: 13px;
    position: relative;

    span {
      color: #5d7490;
      font-size: 12px;
    }

    .mandatory {
      font-size: 16px;
      position: absolute;
    }
  }
}

.q-hoverable {
  .q-ripple {
    display: none !important;
  }
}

.mediabtn {
  .q-icon {
    font-size: 16px;
  }
}

.media-item {
  background: #fff;
  padding: 4px 6px;
  min-width: 160px;
  max-width: 160px;

  div {
    display: flex;
    align-items: center;
    font-size: 12px;
  }

  img {
    height: 18px;
    margin-right: 10px;
  }
}
</style>
