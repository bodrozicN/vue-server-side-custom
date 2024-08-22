<script setup>
import { useFetch } from '@/composables/useFetch'

const getTodo = () =>
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then((json) => json)

const { data } = useFetch({ key: 'todo-item', callback: getTodo })
</script>

<template>
  <div>Hello World</div>
  <div>{{ data }}</div>
  <RouterLink to="/about">About Page</RouterLink>
</template>
