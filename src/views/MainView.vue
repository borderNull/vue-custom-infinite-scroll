<template>
  <div class="app-wrap">
    <div class="fixed-height">
      <v-infinite-scroll class="vuetify-infinite" height="500" @load="loadFirstList">
        <template v-for="item in firstList" :key="item.id.value">
          <list-element :item="item"></list-element>
        </template>
      </v-infinite-scroll>
      <infinite-custom-scroll :height="500" :loadMore="loadSecondList">
        <template v-for="item in secondList" :key="item.id.value">
          <list-element :item="item"></list-element>
        </template>
      </infinite-custom-scroll>
    </div>
    <infinite-custom-scroll :loadMore="loadThirdList">
      <template v-for="item in thirdList" :key="item.id.value">
        <list-element :item="item"></list-element>
      </template>
    </infinite-custom-scroll>
  </div>
</template>

<script setup lang="ts">
import InfiniteCustomScroll from '../components/InfiniteCustomScroll.vue'
import ListElement from '@/components/ListElement.vue'
import { type ListItem, type InfiniteScrollStatus } from '@/types'
import { loadUsers } from '@/api'
import { ref } from 'vue'

const firstList = ref<ListItem[]>([])
const secondList = ref<ListItem[]>([])
const thirdList = ref<ListItem[]>([])

async function loadFirstList({ done }: { done: (status: InfiniteScrollStatus) => void }) {
  try {
    const response = await loadUsers()
    if (response?.length) {
      firstList.value.push(...response)
    }
    done('ok')
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}

const loadSecondList = async () => {
  try {
    const response = await loadUsers()

    if (response?.length) {
      secondList.value.push(...response)
    }
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}

const loadThirdList = async () => {
  try {
    const response = await loadUsers()
    if (response?.length) {
      thirdList.value.push(...response)
    }
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}
</script>

<style>
.app-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;
}

.vuetify-infinite {
  gap: 16px;
  padding: 0 10px;
}

.fixed-height {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
