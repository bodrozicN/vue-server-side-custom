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
    <li>
      <RouterLink :to="{ name: 'dashboardInfo' }">Dashboard Info</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'user', params: { userId: 1 } }">User Page</RouterLink>
    </li>
  </ul>
</template>

<style lang="css" scoped>
ul {
  border: 3px solid red;
}
</style>
