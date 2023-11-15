<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import VInput from './controls/VInput.vue'
import VRadioElement from './controls/VRadioElement.vue'
import { calcData } from '/src/composables/calcData.ts'

let someVal = ref(undefined)
const generalData = calcData()
console.log(generalData)
let itog = ref(2300000)
let itogFormated = computed(() => itog.value.toLocaleString('ru-RU'))
// let compVal = computed(() => someVal.value * 10);
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
                <VRadioElement v-for="(item, index) in generalData" :id="`select_${index}`" :attrName="`select_${index}`" :displayName="item.name"></VRadioElement>
            </div> 
        </div>
        <div class="vcalc__section">
          <div class="vcalc__subtitle">Основные параметры</div>
          <div class="vcalc__inpt-grid">
            <VInput
              v-model="someVal"
              required
              type="number"
              placeholder=" "
              :labelPlaceholder="'Площадь помещения'"
            ></VInput>
            <VInput
              required
              type="number"
              placeholder=" "
              :labelPlaceholder="'Толщина слоя'"
            ></VInput>
          </div>
          <p class="text-pink text-[24px] font-[500]">
            Минимальная толщина стяжки – 4см, максимальная – 15см
          </p>
        </div>
        <div class="vcalc__section">
          <div class="vcalc__subtitle">Коммуникации</div>
          <div class="vcalc__inpt-grid">
            <VInput
              v-model="someVal"
              required
              type="number"
              placeholder=" "
              :labelPlaceholder="'Площадь помещения'"
            ></VInput>
            <VInput
              required
              type="number"
              placeholder=" "
              :labelPlaceholder="'Толщина слоя'"
            ></VInput>
          </div>
        </div>
        <div class="vcalc__section">
          <div class="vcalc__subtitle">Дополнительно</div>
          <div class="vcalc__inpt-grid"></div>
        </div>
      </div>
      <div class="vcalc__result">
        <span class="text-violet text-[40px] font-semibold"
          >Результат : <span class="text-white">{{ itogFormated }} ₽</span></span
        >
      </div>
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
    }
    &subtitle {
      @apply leading-[110%];
      font-size: 40px;
      font-weight: 600;
      color: var(--white);
      letter-spacing: 1.2px;
    }
    &calculating-part {
      @apply max-w-[843px];
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
