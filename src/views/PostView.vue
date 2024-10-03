<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/post'
import type { IPost } from '@/types/post'
import { Button } from '@/components/ui/button'
import UpdatePostModal from '@/components/post/UpdatePostModal.vue'

const { getPost } = usePostStore()
const route = useRoute()
const router = useRouter()
const { deletePost } = usePostStore()

const post = ref<IPost>()

function redirectAndDeletePost() {
  if (post.value) {
    deletePost(post.value.id)
    router.push('/')
  }
}

onMounted(() => {
  post.value = getPost(Number(route.params.postId))
})
</script>

<template>
  <div v-if="post" class="flex flex-col max-w-screen-lg w-full m-auto p-10 gap-16">
    <RouterLink to="/">
      <Button>Back</Button>
    </RouterLink>

    <div class="flex w-full justify-between">
      <div>
        <p class="text-3xl font-bold">{{ post.title }}</p>
        <p class="opacity-50">{{ post.createDate }}</p>
      </div>
      <div class="flex gap-5">
        <UpdatePostModal :post="post" />
        <Button variant="destructive" @click="redirectAndDeletePost">Delete</Button>
      </div>
    </div>
    <p class="text-2xl">{{ post.description }}</p>
  </div>
  <div v-else class="w-full flex flex-col gap-6 items-center my-10">
    <RouterLink to="/">
      <Button>Go Back</Button>
    </RouterLink>
    <span class="text-3xl">Post Not Found</span>
  </div>
</template>
