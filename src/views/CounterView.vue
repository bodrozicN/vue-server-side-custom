<script setup>
import CounterComponent from '@/components/CounterComponent.vue'
</script>

<template>
  <Suspense>
    <template #fallback>Loading</template>
    <CounterComponent />
  </Suspense>
</template>
