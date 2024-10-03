import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { IPost, IPostBody } from '@/types/post'

export const usePostStore = defineStore('post', () => {
  const posts = ref<IPost[]>(useLocalStorage('posts', []).value)

  function createPost(post: IPostBody) {
    const newPost: IPost = {
      id: posts.value[posts.value.length - 1] ? posts.value[posts.value.length - 1].id + 1 : 1,
      title: post.title,
      description: post.description,
      createDate: new Date()
    }

    posts.value.push(newPost)
  }

  function getPost(postId: number) {
    const postIndex = posts.value.findIndex((post) => post.id === postId)

    return posts.value[postIndex]
  }

  function updatePost(post: IPostBody, postId: number) {
    const postIndex = posts.value.findIndex((post) => post.id === postId)

    posts.value[postIndex] = {
      id: posts.value[postIndex].id,
      title: post.title,
      description: post.description,
      createDate: posts.value[postIndex].createDate
    }
  }

  function deletePost(postId: number) {
    const postIndex = posts.value.findIndex((post) => post.id === postId)

    posts.value.splice(postIndex, 1)
  }

  return {
    posts,
    getPost,
    createPost,
    updatePost,
    deletePost
  }
})
