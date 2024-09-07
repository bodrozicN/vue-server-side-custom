<template>
  <ul>
    <li>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'about' }">About</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'privacy' }">Privacy</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
    </li>
  </ul>
</template>

<style lang="css" scoped>
ul {
  border: 3px solid red;
}
</style>
