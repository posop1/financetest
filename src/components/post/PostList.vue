<script lang="ts" setup>
import { usePostStore } from '@/stores/post'
import PostItem from './PostItem.vue'

const { posts } = usePostStore()
</script>

<template>
  <div class="w-full flex justify-center my-10">
    <div class="flex flex-col gap-6 w-full items-center" v-if="posts.length > 0">
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div v-else>
      <span class="text-3xl">Posts Not Found</span>
    </div>
  </div>
</template>
