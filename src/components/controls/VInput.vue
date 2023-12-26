<script lang="ts" setup>
import { onMounted, ref, useAttrs, watch } from 'vue';


 

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
const attrs = useAttrs(); 

const inptEl = ref(null);

onMounted(() => { 
  if (typeof (IMask) !== 'undefined' && attrs.type==='tel') {

    const maskOptions = {
      mask: '+{7} 000 000-00-00', 
    };
    const mask = IMask(inptEl.value, maskOptions);
    let trys = false;
    inptEl.value.addEventListener('input', () => {
      if (trys == false && mask.value[3] != '9' && mask.value[3] != undefined) {
        mask.value = '+7 ';
      }
    });
    inptEl.value.placeholder = '+7(___)-___-__-__'; 

  }
})
 

</script>
<template>
  <div :class="{'inpt__has-error' : err}" class="inpt__wrapper">
    <input ref="inptEl" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" class="inpt" />
    <label class="inpt__placeholder">{{ labelPlaceholder }}</label> 
    <label class="inpt__placeholder-error inpt__placeholder" v-if="err"> {{ err }} </label>
  </div>
</template>
