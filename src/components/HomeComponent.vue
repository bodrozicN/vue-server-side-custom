<script setup>
import { useFetch } from '@/composables/useFetch'

const getTodo = () =>
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then((json) => json)

const { data: todo } = await useFetch({ key: 'todo-item', callback: getTodo })

const getRandomJoke = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return fetch('https://official-joke-api.appspot.com/random_joke')
    .then((res) => res.json())
    .then((data) => data)
}

const { data: joke } = await useFetch({ callback: getRandomJoke, key: 'random-joke' })
</script>

<template>
  <div>Hello World</div>
  <div>{{ todo.title }}</div>
  <div>{{ joke.setup }} {{ joke.punchline }}</div>
  <RouterLink to="/about">About Page</RouterLink>
</template>
