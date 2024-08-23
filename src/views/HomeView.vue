<script setup>
import HomeComponent from '@/components/HomeComponent.vue'
import ClientOnly from '@/components/ClientOnly.vue'
</script>

<template>
  <Suspense>
    <template #fallback>Loading</template>
    <HomeComponent />
  </Suspense>
  <ClientOnly>
    <div>This Will Be Generated Only On Client Side</div>
  </ClientOnly>
</template>
