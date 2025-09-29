<template>
  <div class="homepage" id="homepage">
    <div class="banner" id="banner">
      <img src="/images/banner.png" alt="Banner" id="banner-image" />
      <div class="banner__content" id="banner-content">
        <div class="banner__inner-content" id="banner-inner-content">
          <h6 id="banner-heading">Your Future, Securely Insured</h6>
          <p id="banner-description">
            Discover personalised insurance plans designed to protect every aspect of your life. Get
            a quick quote today and experience peace of mind.
          </p>
        </div>
      </div>
    </div>

    <div class="pagecaption" id="pagecaption">
      <h6 id="pagecaption-heading">Our Comprehensive Insurance Solutions</h6>
      <p id="pagecaption-description">
        Explore our wide range of insurance products designed to meet your every need, from personal
        coverage to business protection
      </p>
    </div>

    <div class="bannercards q-px-lg q-mb-xl" id="bannercards">
      <div class="row q-col-gutter-x-md" id="bannercards-row">
        <div
          class="col"
          v-for="(card, index) in insurancecards"
          :key="card"
          :id="`insurance-card-${card.id}`"
        >
          <q-card>
            <q-item>
              <q-item-section avatar>
                <q-icon :name="card.icon" :id="`insurance-card-${card.id}-icon`" />
              </q-item-section>
              <q-item-section>
                <q-item-label :id="`insurance-card-${card.id}-name`">{{ card.name }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-card-section class="img">
              <img :src="card.image" :id="`insurance-card-${card.id}-image`" />
            </q-card-section>
            <q-card-section class="content" :id="`insurance-card-${card.id}-content`">
              {{ card.content }}
            </q-card-section>
            <q-card-actions align="left">
              <q-btn
                :ripple="false"
                flat
                icon-right="mdi-chevron-down"
                class="removeHover teritarybtn"
                no-caps
                label="Explore Options"
                :id="`insurance-card-${card.id}-explore-btn`"
              >
                <q-menu>
                  <q-list :id="`insurance-card-${card.id}-options`">
                    <q-item
                      clickable
                      v-for="(item, optIndex) in card.options"
                      :key="item"
                      dense
                      :id="`insurance-card-${card.id}-option-${optIndex}`"
                    >
                      <q-item-section>
                        <q-item-label> {{ item }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <div class="whychoosecontainer q-mb-xl q-pb-xl" id="whychoose">
      <div class="content" id="whychoose-content">
        <h6 id="whychoose-heading">Why choose Q-Insurance?</h6>
        <p id="whychoose-description">
          We are committed to providing you with reliable coverage and exceptional service.
        </p>
      </div>
      <div class="row q-col-gutter-x-md q-px-lg" id="whychoose-row">
        <div
          class="col"
          v-for="(choosecard, index) in choosecardInsurance"
          :key="choosecard"
          :id="`choose-card-${index}`"
        >
          <q-card flat>
            <q-card-section class="text-center q-py-lg">
              <q-icon :name="choosecard.icon" size="42px" :id="`choose-card-${index}-icon`" />
              <h6 :id="`choose-card-${index}-title`">{{ choosecard.title }}</h6>
              <p :id="`choose-card-${index}-content`">{{ choosecard.content }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="ourclients" id="ourclients">
      <div class="content" id="ourclients-content">
        <h6 id="ourclients-heading">What Our Clients Have Used the Most</h6>
      </div>
      <div class="row q-mb-lg q-mx-lg" id="ourclients-row">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <div class="row justify-between q-mb-md" id="ourclients-header">
                <p class="q-mb-none text-weight-bold" id="ourclients-title">
                  Insurance Used by our clients
                  <q-icon name="mdi-information-outline" size="14px" id="ourclients-info-icon" />
                </p>
                <q-btn
                  icon="mdi-dots-vertical"
                  flat
                  dense
                  :ripple="false"
                  class="removeHover"
                  size="sm"
                  id="ourclients-menu-btn"
                />
              </div>
              <div class="progresscontainer" id="ourclients-progress">
                <div
                  class="row items-center q-col-gutter-x-sm q-mb-md"
                  v-for="(progressItem, pIndex) in [
                    { name: 'Vehicle Insurance', rating: ratingModel, progress: progress },
                    { name: 'Health Insurance', rating: ratingModel2, progress: progress2 },
                    { name: 'Term Insurance', rating: ratingModel3, progress: progress3 },
                    { name: 'Travel Insurance', rating: ratingModel4, progress: progress4 },
                    { name: 'Travel Word', rating: ratingModel5, progress: progress5 },
                  ]"
                  :key="pIndex"
                  :id="`ourclients-progress-item-${pIndex}`"
                >
                  <div class="col-1">
                    <p class="q-mb-none" :id="`ourclients-progress-item-${pIndex}-label`">
                      {{ progressItem.name }}
                    </p>
                  </div>
                  <div class="col-auto">
                    <q-rating
                      v-model="progressItem.rating"
                      size="1em"
                      color="orange"
                      readonly
                      :id="`ourclients-progress-item-${pIndex}-rating`"
                    />
                  </div>
                  <div class="col">
                    <q-linear-progress
                      size="8px"
                      rounded
                      :value="progressItem.progress"
                      color="green"
                      :id="`ourclients-progress-item-${pIndex}-bar`"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, onMounted } from 'vue'
export default {
  setup() {
    const insurancecards = ref([
      {
        id:1,
        icon: 'mdi-car-back',
        name: 'Vehicle Insurance',
        image: 'images/vechileInsurance-img.png',
        content:
          'Comprehensive coverage for your cars, trucks and motorcycles, protecting you against accidents, theft and damages.',
        options: ['Automobile', 'Truck', 'Motorcycle'],
      },
      {
        id:2,
        icon: 'mdi-plus-box',
        name: 'Health Insurance',
        image: 'images/healthInsurance.png',
        content:
          'Protect your health with plans that cover medical expenses, hospitalisation, and preventative care.',
        options: ['For Individuals', 'For a Family', 'For a Senior Citizen'],
      },
      {
        id:3,
        icon: 'mdi-plus-box',
        name: 'Term Insurance',
        image: 'images/termInsurance.png',
        content:
          'Secure your family’s future with affordable term life plans that offer insurances for holidays, business trips and more!',
        options: ['For a Holiday', 'For Business', 'For Students'],
      },
      {
        id:4,
        icon: 'mdi-airplane',
        name: 'Travel Insurance',
        image: 'images/travelInsurance.png',
        content:
          'Journey worry-free with coverage for unexpected events, medical emergencies, and lost luggage during your travels.',
        options: ['Individual', 'Joint Term', 'Group Term'],
      },
    ])
    const choosecardInsurance = ref([
      {
        icon: 'mdi-shield-check',
        title: 'Comprehensive Coverage',
        content: 'Protecting what matters most with extensive plans tailored to your unique needs.',
      },
      {
        icon: 'mdi-trending-up',
        title: 'Competitive Rates',
        content:
          'Get the best value for your money with our affordable and flexible insurance options.',
      },
      {
        icon: 'mdi-currency-usd',
        title: 'Competitive Rates',
        content:
          'Get the best value for your money with our affordable and flexible insurance options.',
      },
    ])
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
    }

    onMounted(() => {
      shuffleArray(insurancecards.value)
    })
    return {
      insurancecards,
      choosecardInsurance,
      ratingModel: ref(3),
      ratingModel2: ref(4),
      ratingModel3: ref(5),
      ratingModel4: ref(2),
      ratingModel5: ref(1),
      progress: 0.4,
      progress2: 0.6,
      progress3: 0.2,
      progress4: 0.3,
      progress5: 0.4,
    }
  },
}
</script>
<style lang="scss">
.homepage {
  .banner {
    width: 100%;
    height: 495px;
    position: relative;
    img {
      width: 100%;
    }
    &__content {
      width: 55%;
      padding: 25px 20px;
      position: absolute;
      top: 31%;
      left: 26%;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 16px;
    }
    &__inner-content {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      h6 {
        font-size: 42px;
        font-weight: 600;
        color: #171b33;
        margin: 0px;
      }
      p {
        font-size: 22px;
        color: #5d7490;
        margin: 10px 0 0 0;
        text-align: center;
      }
    }
  }
  .pagecaption {
    max-width: 700px;
    margin: 40px auto;
    text-align: center;
    h6 {
      margin: 0px;
      font-size: 30px;
      font-weight: 600;
      color: #171b33;
    }
    p {
      font-size: 16px;
      color: #5d7490;
    }
  }
  .bannercards {
    .q-card {
      height: 100%;
      .q-item {
        &__section--avatar {
          min-width: auto;
          padding-right: 10px;
        }
        &__label {
          font-size: 20px;
        }
      }
      .img {
        padding-top: 0px;
        padding-bottom: 0px;
        img {
          width: 100%;
        }
      }
      .content {
        padding-bottom: 0px;
        min-height: 75px;
        font-size: 14px;
      }
      .teritarybtn {
        .block {
          text-decoration: underline;
        }
        .q-icon {
          margin-left: 6px;
        }
      }
    }
  }
}
.whychoosecontainer {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fffae9;
  .content {
    width: 700px;
    text-align: center;
    margin: 0 auto;
    padding: 40px 0;
    h6 {
      font-size: 28px;
      font-weight: 600;
      color: #171b33;
      margin: 0 0 6px 0;
    }
    p {
      font-size: 16px;
      color: #5d7490;
      margin: 0px;
    }
  }
  .q-card {
    h6 {
      margin: 8px 0;
      font-size: 24px;
    }
    p {
      margin: 0px;
      color: #171b33;
      font-size: 14px;
    }
  }
}
.ourclients {
  .content {
    width: 700px;
    text-align: center;
    margin: 0 auto;
    h6 {
      margin: 0 0 30px 0;
      font-size: 28px;
      font-weight: 600;
    }
  }
}
.progresscontainer {
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
}
</style>
<route lang="yaml">
meta:
  layout: navbar
</route>
