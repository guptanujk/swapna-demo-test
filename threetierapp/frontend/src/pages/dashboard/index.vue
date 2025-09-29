<template>
  <div class="q-pa-sm dashboard">
    <div class="main-headding q-mb-md">Welcome, John - Claims Manager</div>
    <div class="sub-headding q-mb-sm">Key Statistics</div>
    <div class="row q-col-gutter-x-sm">
      <div class="col-2">
        <q-card class="statistics-card">
          <q-card-section class="text-center items-center">
            <h6 class="q-my-none text-weight-bold">327</h6>
            <p>
              <q-icon name="mdi-account-multiple" />
              Total No. of Customers
            </p>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-5">
        <q-card class="policycard">
          <q-card-section class="q-pa-sm">
            <div class="header text-weight-bold">Policy Information</div>
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <div class="card-item">
                  <h6 class="q-my-none text-weight-bold">12</h6>
                  <p>
                    <q-icon class="q-mr-sm" name="mdi-format-list-bulleted" />
                    Total No. of Policies
                  </p>
                </div>
              </div>
              <div class="col-6">
                <div class="card-item">
                  <h6 class="q-my-none text-weight-bold">12</h6>
                  <p>
                    <q-badge rounded color="green" />
                    Active Policies
                  </p>
                </div>
              </div>
              <div class="col-6">
                <div class="card-item">
                  <h6 class="q-my-none text-weight-bold">0</h6>
                  <p>
                    <q-badge rounded color="red" />
                    Inactive Policies
                  </p>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-5">
        <q-card class="policycard">
          <q-card-section class="q-pa-sm">
            <div class="header text-weight-bold">Claim Information</div>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <div class="card-item">
                  <h6 class="q-my-none text-weight-bold">1,245</h6>
                  <p class="text-blue">
                    <q-icon class="q-mr-sm" name="mdi-call-received" size="xs" />
                    Total Claims Recieved
                  </p>
                </div>
              </div>
              <div class="col-6">
                <div class="card-item">
                  <h6 class="q-my-none text-weight-bold">128</h6>
                  <p class="text-orange">
                    <q-icon class="q-mr-sm" name="mdi-help-circle" size="xs" />
                    Claims Pending Approval
                  </p>
                </div>
              </div>
              <div class="col-6">
                <div class="card-item">
                  <h6 class="q-my-none text-weight-bold">987</h6>
                  <p class="text-green">
                    <q-icon class="q-mr-sm" name="mdi-check-decagram" size="xs" />
                    Claims Approved
                  </p>
                </div>
              </div>
              <div class="col-6">
                <div class="card-item">
                  <h6 class="q-my-none text-weight-bold">130</h6>
                  <p class="text-red">
                    <q-icon class="q-mr-sm" name="mdi-close-circle" size="xs" />
                    Claims Rejected
                  </p>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-mt-sm q-col-gutter-sm">
      <div class="col-6">
        <q-card class="policycard chartCard">
          <q-card-section class="q-pa-sm">
            <div class="header text-weight-bold row justify-between">
              <span>Claims Performance</span>
              <q-icon name="mdi-calendar-range" />
            </div>
            <div class="chartImg q-pa-sm text-center">
              <img src="/images/claimsPerformance.png" alt="Performance" />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="policycard chartCard">
          <q-card-section class="q-pa-sm">
            <div class="header text-weight-bold row justify-between">
              <span>Policy Performance</span>
              <q-icon name="mdi-calendar-range" />
            </div>
            <div class="chartImg q-pa-sm text-center">
              <img src="/images/policyperformance.png" alt="Policy Performance" />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card class="policycard chartCard">
          <q-card-section class="q-pa-sm">
            <div class="header text-weight-bold row justify-between">
              <span> Avg. Cost per Claim</span>
              <q-icon name="mdi-calendar-range" />
            </div>
            <div class="chartImg q-pa-sm text-center">
              <img src="/images/costperclaim.png" alt="Policy Performance" />
            </div>
            <p class="text-center">$20.35K</p>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-8">
        <q-card class="policycard chartCard">
          <q-card-section class="q-pa-sm">
            <div class="header text-weight-bold row justify-between">
              <span> Claim Amount Comparision</span>
              <q-icon name="mdi-calendar-range" />
            </div>
            <div class="chartImg q-pa-sm text-center">
              <img src="/images/amountcomparision.png" alt="Amount Comparison" />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card class="policycard chartCard">
          <q-card-section class="q-pa-sm">
            <div class="header text-weight-bold row justify-between">
              <span> Claim Settlement Ratio</span>
              <q-icon name="mdi-calendar-range" />
            </div>
            <div class="chartImg q-pa-sm text-center">
              <img src="/images/settement.png" alt="Claim Settlement Ratio" />
            </div>
            <p class="text-center">85.44%</p>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-8">
        <q-card class="policycard chartCard">
          <q-card-section class="q-pa-sm">
            <div class="header text-weight-bold row justify-between">
              <span> Claims Paid Out vs Denied</span>
              <q-icon name="mdi-calendar-range" />
            </div>
            <div class="chartImg q-pa-sm text-center">
              <img src="/images/claimspaid.png" alt="Claims Paid" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="sub-headding q-my-md">Recent Activity</div>
    <div class="activitylist">
      <q-list>
        <q-item>
          <q-item-section avatar class="q-pr-none">
            <q-icon name="mdi-timer-outline" color="orange" />
          </q-item-section>
          <q-item-section>
            <div class="row">
              <p class="q-mb-none q-mr-sm">Claim #VI12345 - Vehicle</p>
            <span>10 mins ago</span></div>
          </q-item-section>
          <q-item-section side>$5,500</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar class="q-pr-none">
            <q-icon name="mdi-close-circle" color="red" />
          </q-item-section>
          <q-item-section>
            <div class="row">
              <p class="q-mb-none q-mr-sm">Claim #VI12345 - Vehicle</p>
            <span>10 mins ago</span></div>
          </q-item-section>
          <q-item-section side>$1,200</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar class="q-pr-none">
            <q-icon name="mdi-timer-outline" color="orange" />
          </q-item-section>
          <q-item-section>
            <div class="row">
              <p class="q-mb-none q-mr-sm">Claim #VI12345 - Vehicle</p>
            <span>10 mins ago</span></div>
          </q-item-section>
          <q-item-section side>$250,000</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar class="q-pr-none">
            <q-icon name="mdi-check-circle" color="green" />
          </q-item-section>
          <q-item-section>
            <div class="row">
              <p class="q-mb-none q-mr-sm">Claim #VI12345 - Vehicle</p>
            <span>10 mins ago</span></div>
          </q-item-section>
          <q-item-section side>$850</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar class="q-pr-none">
            <q-icon name="mdi-close-circle" color="red" />
          </q-item-section>
          <q-item-section>
            <div class="row">
              <p class="q-mb-none q-mr-sm">Claim #VI12345 - Vehicle</p>
            <span>10 mins ago</span></div>
          </q-item-section>
          <q-item-section side>$1,200</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar class="q-pr-none">
            <q-icon name="mdi-check-circle" color="green" />
          </q-item-section>
          <q-item-section>
            <div class="row">
              <p class="q-mb-none q-mr-sm">Claim #VI12345 - Vehicle</p>
            <span>10 mins ago</span></div>
          </q-item-section>
          <q-item-section side>$850</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar class="q-pr-none">
            <q-icon name="mdi-timer-outline" color="orange" />
          </q-item-section>
          <q-item-section>
            <div class="row">
              <p class="q-mb-none q-mr-sm">Claim #VI12345 - Vehicle</p>
            <span>10 mins ago</span></div>
          </q-item-section>
          <q-item-section side>$5,500</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref } from 'vue'
export default {
  setup() {
    return {}
  },
}
</script>
<style lang="scss">
.dashboard {
  .main-headding {
    font-size: 20px;
    font-weight: 600;
  }
  .sub-headding {
    font-size: 16px;
    font-weight: 600;
  }
  .statistics-card {
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .policycard {
    min-height: 250px;
    max-height: 392px;
    .header {
      font-size: 13px;
    }
    .card-item {
      min-height: 103px;
      background-color: #fffae9;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
  .chartImg {
    width: 100%;
    img {
      width: 80%;
    }
  }
  .chartCard {
    height: 350px;
  }
}
.activitylist {
  width: 100%;
  .q-item {
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 5px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  }
  .q-item__section--avatar {
    min-width: 36px;
  }
  span {
    color: #6C6F81;
  }
  .q-item:nth-child(even) {
    background-color: #F5F5FB;
  }
}
</style>
<route lang="yaml">
meta:
  layout: navbar
</route>
