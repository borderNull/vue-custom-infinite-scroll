<template>
  <v-card
    rounded
    style="overflow: initial; z-index: initial"
    :subtitle="item.email"
    :prepend-avatar="item.picture.thumbnail"
    :title="`${item.name.title}
          ${item.name.first}
          ${item.name.last}`"
  >
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type ListItem } from '@/types'

const { item } = defineProps<{ item: ListItem }>()
</script>
