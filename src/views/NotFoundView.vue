<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

setTimeout(() => {
  router.push('/')
}, 6000)
</script>

<template>
  <section class="min-h-dvh w-full flex justify-center items-center">
    <h2 class="text-2xl">Страница не найдена 404</h2>
  </section>
</template>
