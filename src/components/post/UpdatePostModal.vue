<script setup lang="ts">
import { ref } from 'vue'
import { usePostStore } from '@/stores/post'
import type { IPost, IPostBody } from '@/types/post'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface IUpdatePostModalProps {
  post: IPost
}

const { post } = defineProps<IUpdatePostModalProps>()
const { updatePost } = usePostStore()

const title = ref(post.title)
const description = ref(post.description)

function update() {
  const updatedPost: IPostBody = {
    title: title.value,
    description: description.value
  }

  updatePost(updatedPost, post.id)
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="secondary">Edit</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Post</DialogTitle>
      </DialogHeader>

      <div class="flex flex-col gap-8">
        <div class="my-2">
          <Label for="title" class="text-right"> Title </Label>
          <Input id="title" v-model="title" />
        </div>
        <Textarea placeholder="Type your message here." v-model="description" />
      </div>

      <DialogFooter>
        <DialogClose as-child>
          <Button type="button" variant="secondary" @click="update"> Update </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
