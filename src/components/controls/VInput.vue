<script lang="ts" setup>
import { computed } from '@vue/reactivity';

 

interface IProps{
    labelPlaceholder?: string,
    modelValue? : unknown,
    err? : unknown
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
  <div class="inpt__wrapper">
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" class="inpt" />
    <label class="inpt__placeholder">{{ labelPlaceholder }}</label> 
  </div>
</template>
