<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/post'
import type { IPost } from '@/types/post'
import { Button } from '@/components/ui/button'

const { getPost } = usePostStore()
const route = useRoute()

const post = ref<IPost>()

onMounted(() => {
  post.value = getPost(Number(route.params.postId))
})
</script>

<template>
  <div v-if="post" class="flex flex-col max-w-screen-lg w-full m-auto p-10 gap-16">
    <RouterLink to="/">
      <Button>Back</Button>
    </RouterLink>
    <div>
      <p class="text-3xl font-bold">{{ post.title }}</p>
      <p class="opacity-50">{{ post.createDate.toLocaleDateString() }}</p>
    </div>
    <p class="text-2xl">{{ post.description }}</p>
  </div>
  <div v-else class="w-full flex flex-col gap-6 items-center my-10">
    <span class="text-3xl">Post Not Found</span>
    <RouterLink to="/">
      <Button>Go Back</Button>
    </RouterLink>
  </div>
</template>
