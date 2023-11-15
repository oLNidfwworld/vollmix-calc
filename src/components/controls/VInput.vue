<script lang="ts" setup> 
import { useAttrs } from 'vue'
interface IProps{
    labelPlaceholder?: string,
    modelValue? : Any
}
interface IEmits{
    'update:modelValue' : [val: Any] 
}

defineOptions({
  inheritAttrs: false
})

const props = defineProps<IProps>();   
const emits = defineEmits<IEmits>();
// const emits = defineEmits(['update:modelValue']);
</script>
<template>
  <div class="inpt__wrapper">
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" class="inpt" />
    <label class="inpt__placeholder">{{ labelPlaceholder }}</label>
  </div>
</template>
