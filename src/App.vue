<script setup lang="ts">
  import DefaultHeader from './components/DefaultHeader.vue';
  import DefaltFooter from './components/DefaltFooter.vue';
</script>

<template>
  <DefaultHeader />
  <main>

  </main>
  <DefaltFooter />
</template>

<style scoped>
  main {
    grid-area: main;
    overflow-y: auto;
    border-color: black;
  }
</style>