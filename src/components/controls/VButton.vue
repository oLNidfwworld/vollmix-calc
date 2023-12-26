<script setup lang="ts">
const props = defineProps({
    
})
defineOptions({
  inheritAttrs: false
})
</script>
<template>
    <button v-bind="$attrs" class="btn preset-1">
        <span>
            <slot></slot>
        </span>
    </button>
</template>