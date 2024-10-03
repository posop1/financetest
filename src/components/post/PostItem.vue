<script lang="ts" setup>
import type { IPost } from '@/types/post'
import { Button } from '@/components/ui/button'
import { usePostStore } from '@/stores/post'
import UpdatePostModal from './UpdatePostModal.vue'

interface IPostItemProps {
  post: IPost
}

const { post } = defineProps<IPostItemProps>()
const { deletePost } = usePostStore()
</script>

<template>
  <div class="flex flex-col shadow-2xl p-8 rounded-md gap-5 w-full max-w-screen-lg">
    <div class="flex justify-between items-center">
      <p class="font-bold text-2xl">{{ post.title }}</p>
      <p class="opacity-50">{{ post.createDate }}</p>
    </div>
    <p class="text-xl">{{ post.description }}</p>
    <div class="self-end flex gap-5">
      <UpdatePostModal :post="post" />
      <Button variant="destructive" @click="deletePost(post.id)">Delete</Button>
      <RouterLink :to="'/post/' + post.id">
        <Button> Learn More </Button>
      </RouterLink>
    </div>
  </div>
</template>
