<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue';
import VInput from './controls/VInput.vue';
import VCheckbox from './controls/VCheckbox.vue';
import VRadioElement from './controls/VRadioElement.vue';
import { calcData } from '/src/composables/calcData.ts';
import MainForm from '/src/components/forms/MainForm.vue';

const generalData = calcData()
const currentData = reactive(generalData.find((x : any) => x.active.value === true)) 
currentData.runWatchers();

const itog = computed(() => {
  if( isNaN(parseInt(currentData.itog())) ) {
    return false;
  } else {
    return currentData.itog();
  }
});

const itogFormated = computed(() => itog.value.toLocaleString('ru-RU'))

const dataToSend = computed(( ) => {

  let dataTmp = {
    name : currentData.name, 
    ...{ ...currentData.additionals, ...currentData.generalParams, ...currentData.communications }
  } 
  
  for(const [key, dataTmpValue] of Object.entries(dataTmp) ) {
    if(key === 'name') continue;
    dataTmp[key] = (dataTmpValue.value !== undefined)?dataTmpValue.value:dataTmpValue.inputValue
  } 
  return dataTmp;
} ) 
// const errorWatcher = watch(() => currentData.generalParams.layerHeight.inputValue, (newVal) => {
//   console.log(newVal);
// });

// currentData.generalParams.layerHeight.log()

</script>
<template> 
  <div class="vcalc">
    <div class="vcalc__wrapper">
      <svg
        class="mb-5 scrollTrg"
        width="70%"
        height="1"
        viewBox="0 0 70% 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="translate: none; rotate: none; scale: none; transform: translate(0%, 0px)"
      >
        <line opacity="0.5" y1="0.5" x2="70%" y2="0.5" stroke="white"></line>
      </svg>
      <svg
        class="mb-5 scrollTrg md:mb-10 scrollTrg"
        width="100%"
        height="1"
        viewBox="0 0 100% 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="translate: none; rotate: none; scale: none; transform: translate(0%, 0px)"
      >
        <line y1="0.5" x2="100%" y2="0.5" stroke="white"></line>
      </svg>
      <h2 class="mb-5 md:mb-10 section-title-style text-white">
        Калькулятор <span class="text-violet">механизированных работ</span>
      </h2>
      <svg
        class="mb-5 scrollTrg md:mb-10 scrollTrg"
        width="50%"
        height="1"
        viewBox="0 0 50% 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="translate: none; rotate: none; scale: none; transform: translate(0%, 0px)"
      >
        <line y1="0.5" x2="50%" y2="0.5" stroke="white"></line>
      </svg>
      <div class="vcalc__calculating-part">
        <div class="vcalc__section">
          <div class="switch-row">
            <VRadioElement
              v-for="(item, index) in generalData" :key="index"
              :id="`select_${index}`"
              :active="item.active.value"
              :attrName="`lolkek`"
              :displayName="item.name"
            ></VRadioElement>
          </div>
        </div>
        <div v-if="currentData.generalParams" class="vcalc__section">
          <div class="vcalc__subtitle">Основные параметры</div>
          <div class="vcalc__inpt-grid">
            <VInput
              v-for="(item, index) in currentData.generalParams" :key="index"
              v-model="item.inputValue"
              required
              type="number"
              placeholder=" "
              :labelPlaceholder="item.name" 
              :err="item.errorMessage"
            ></VInput>
          </div>
          <p class="text-pink text-[24px] font-[500]">
            Минимальная толщина стяжки – 4см, максимальная – 15см
            Площадь помещения - от 50м<sup>2</sup>
          </p>
        </div>
        <div class="vcalc__section">
          <div class="vcalc__subtitle">Коммуникации</div>
          <div class="vcalc__inpt-grid"> 
            <VCheckbox v-for="(item, index) in currentData.communications" v-model="item.value" :key="index" :id="`communications_${item.code}`" :attrName="item.code" >
              {{ item.name }}
            </VCheckbox>
          </div>
        </div>
        <div class="vcalc__section">
          <div class="vcalc__subtitle">Дополнительно</div>
          <div class="vcalc__inpt-grid">
            <VCheckbox v-for="(item, index) in currentData.additionals"   v-model="item.value"  :key="index" :id="`additional_${item.code}`" :attrName="item.code"  >
              {{  item.name  }}
            </VCheckbox>
          </div>
        </div>
      </div>
      <div class="vcalc__result">
        <span class="text-violet text-[40px] font-semibold">
          Результат : <span class="text-white">
            <span v-if="itog"> {{ itogFormated }} </span>
            <span v-else> 0 </span> ₽</span>
        </span>
      </div>
      <MainForm :otherData="dataToSend"></MainForm>
    </div>

  </div>
</template>
<style lang="scss">
.vcalc {
  &__ {
    &wrapper {
      @apply p-[140px] w-full;
      background:
        linear-gradient(0deg, rgba(52, 24, 94, 0.79) 0%, rgba(52, 24, 94, 0.79) 100%),
        url(https://vollmix.group/upload/assets/popup-form-mask.bec97c.jpeg),
        lightgray 50% / cover no-repeat;
      @media (max-width: 1279px) {
        padding: 60px;
      }
      @media (max-width: 719px) {
        padding: 30px;
      }
      @media (max-width: 479px) {
        padding: 20px;
      }
      @media (max-width: 329px) {
        padding: 15px;
      }
    }
    &subtitle {
      @apply leading-[110%];
      font-size: 40px;
      font-weight: 600;
      color: var(--white);
      letter-spacing: 1.2px;
      
      @media (max-width: 719px) {
        font-size: 30px;
      } 
      @media (max-width: 479px) {
        font-size: 20px;
      } 
    }
    &calculating-part {
      @apply max-w-[843px];

      .text-pink.text-\[24px\] {
        @media (max-width: 479px) {
          font-size: 18px;
        }
      }
    }
    &section {
      @apply mb-10;
      > * + * {
        @apply mt-[30px];
      }

      &::after {
        content: '';
        @apply mt-[30px] block h-[1px] w-full bg-white;
      }
    }
    &inpt-grid {
      @apply grid grid-cols-2 gap-4;
      @media (max-width: 1023px) {
        @apply grid-cols-1;
      }
    }
    &result {
      .text-violet.text-\[40px\] {
        @media (max-width: 1023px) {
          font-size: 30px;
        }
      }
    }
  }
  .inpt {
    background: #635f98;
    &__ {
      &wrapper {
        * {
          color: var(--white);
        }
      }
    }
  }
}
</style>
