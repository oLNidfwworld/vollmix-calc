<script lang="ts" setup> 
import { useAttrs } from 'vue';
interface IProps{
    attrName : string,
    id : string,
    displayName : string,
    modelValue : unknown,
} 
interface IEmits{
    'update:modelValue' : [val: unknown]  
}
 
defineOptions({
  inheritAttrs: false
})


const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();  
</script>
<template>
  <div class="flex items-center">
    <input  :checked="modelValue" @input="$emit('update:modelValue', $event.target.checked)"    
      placeholder=" "
      class="toggler__hidden"
      :name="attrName" 
      :id="id"
      type="checkbox"
    />
    <label :for="id" class="toggler__label">
      <div class="toggler">
        <div class="toggler__wrapper">
          <div class="toggler__switch"></div>
        </div>
      </div>
    </label>
    <p class="text-white text-[20px] font-semibold ml-5">{{ displayName }}</p>
  </div>
</template>
