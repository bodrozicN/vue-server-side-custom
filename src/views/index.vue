<script setup>
import { ref } from 'vue'

await new Promise((resolve) =>
  setTimeout(() => {
    resolve('success')
  }, 10000)
)

const count = ref(0)
</script>

<template>
  <div>Home page</div>
  <button @click="count++">Count is: {{ count }}</button>
</template>
