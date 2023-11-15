<script setup lang="ts">
import VCalc from './components/VCalc.vue';

</script>
<template>
  <div 
    class="container p-0 sm:px-5 md:px-6 lg:pr-0 2xl:px-[130px]"
  >
    <div class="flex">
      <div class="flex">
        <svg
          class="hidden lg:block mr-5"
          width="1"
          height="65%"
          viewBox="0 0 1 65%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0.5" y1="2.18557e-08" x2="0.499958" y2="65%" stroke="#372E37"></line>
        </svg>
        <svg
          class="hidden lg:block 2lg:mr-[120px] mr-[50px]"
          width="1"
          height="50%"
          viewBox="0 0 1 50%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            opacity="0.5"
            x1="0.5"
            y1="2.18557e-08"
            x2="0.499976"
            y2="50%"
            stroke="#372E37"
          ></line>
        </svg>
        <VCalc />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
