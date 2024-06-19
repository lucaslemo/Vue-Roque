<script setup lang="ts">
  defineProps<{ msg: string }>()
</script>

<template>
  <div class="style">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<style scoped>
  div .style {
    background-color: plum;
  }
</style>