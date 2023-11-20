<script lang="ts" setup>
interface IProps{
    attrName : string,
    id : string,
    displayName : string,
    active : boolean,
}
defineOptions({
  inheritAttrs: false
});

const props = defineProps<IProps>();
</script>
<template>
  <input :checked="active"  type="radio" :name="attrName" :id="id" :value="displayName" />
  <label :for="id" class="switch-element">
    <div class="switch-element__wrapper">
      <i>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75817 25L25 25L25 3.57521H17.4837V12.2736L5.31485 0L0 5.36063L11.9553 17.4189L3.75817 17.4189L3.75817 25Z"
            fill="white"
          ></path>
        </svg>
      </i>
      <div class="switch-element__inner">
        <span class="switch-element__inner-main-text">{{displayName}}</span>
      </div>
    </div>
  </label>
</template>