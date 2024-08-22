<script setup>
import { useFetch } from '@/composables/useFetch'

const getRandomJoke = () =>
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then((res) => res.json())
    .then((data) => data)

const { data } = useFetch({ callback: getRandomJoke, key: 'random-joke' })
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ data }}</p>
    <RouterLink to="/">Back To Home</RouterLink>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
