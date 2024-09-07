<script setup>
import { ref } from 'vue'
import NavBar from '@/components/navBar.vue'

const count = ref(0)
</script>

<template>
  <NavBar />
  <div>Home page</div>
  <button @click="count++">Count is: {{ count }}</button>
</template>
