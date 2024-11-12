<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const logout = () => {
    router.push({name: 'logout'})
  }
</script>

<template>
  <h3>Home</h3>
  <div class="btn-login">
    <button type="button" @click="logout">Sair</button>
  </div>
</template>

<style scoped>
  button a {
    color: #000;
    text-decoration: none;
  }
</style>
