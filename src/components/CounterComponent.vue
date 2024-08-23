<script setup>
import { useFetch } from '@/composables/useFetch'

const getCounter = () => new Promise((resolve) => resolve(5))

const { data } = await useFetch({ key: 'counter', callback: getCounter })
</script>

<template>
  <div>CounterView</div>
  <div>Count is: {{ data }}</div>
  <!-- <button>Count is: {{ data }}</button> -->
</template>
