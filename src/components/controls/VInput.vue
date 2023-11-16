<script lang="ts" setup> 

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

</script>
<template>
  <div class="inpt__wrapper">
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" class="inpt" />
    <label class="inpt__placeholder">{{ labelPlaceholder }}</label>
  </div>
</template>
