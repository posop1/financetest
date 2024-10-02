<script setup lang="ts">
import { ref } from 'vue'
import { usePostStore } from '@/stores/post'
import type { IPostBody } from '@/types/post'

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

const { createPost } = usePostStore()

const title = ref('')
const description = ref('')

function createNewPost() {
  const newPost: IPostBody = {
    title: title.value,
    description: description.value
  }

  createPost(newPost)

  title.value = ''
  description.value = ''
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Create Post</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Post</DialogTitle>
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
          <Button type="button" variant="secondary" @click="createNewPost"> Create </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
