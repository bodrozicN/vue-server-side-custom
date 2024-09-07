<script setup>
import NavBar from '@/components/navBar.vue'

await new Promise((resolve) => setTimeout(resolve, 3400))
</script>

<template>
  <NavBar />
  <div>User With id {{ $route.params.userId }}</div>
</template>
