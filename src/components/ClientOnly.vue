<template>
  <slot v-if="display" />
</template>

<script setup>
import { onMounted, ref } from 'vue'

const display = ref(false)

onMounted(() => {
  display.value = true
})
</script>
