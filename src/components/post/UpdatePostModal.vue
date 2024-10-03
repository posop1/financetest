<script setup lang="ts">
import { ref } from 'vue'
import { usePostStore } from '@/stores/post'
import type { IPost, IPostBody } from '@/types/post'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface IUpdatePostModalProps {
  post: IPost
}

const { post } = defineProps<IUpdatePostModalProps>()
const { updatePost } = usePostStore()

const isOpen = ref(false)

// const title = ref(post.title)
// const description = ref(post.description)

// function update() {
//   const updatedPost: IPostBody = {
//     title: title.value,
//     description: description.value
//   }

//   updatePost(updatedPost, post.id)
// }

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(12).default(post.title),
    description: z.string().min(1).max(50).default(post.description)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values: IPostBody) => {
  const updatedPost: IPostBody = {
    title: values.title,
    description: values.description
  }

  updatePost(updatedPost, post.id)

  isOpen.value = false
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="secondary">Edit</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Post</DialogTitle>
      </DialogHeader>

      <form class="w-2/3 space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Post title" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us a little description about your post"
                class="resize-none"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit"> Submit </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
