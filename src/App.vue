<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Word from './views/Word';
export default {
  name: "App",
  component: {
    Word
  }
}
</script>
<style>
</style>
