<template>
  <div class="infinite-scroll" :style="{ height: checkIsNum(height) }">
    <slot></slot>
    <div class="intersection-trigger" ref="elementToObserve">&nbsp;</div>
    <div class="loader-wrap">
      <v-progress-circular :size="32" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
const props = defineProps<{
  height?: number
  loadMore: () => Promise<void>
}>()
const isLoading = ref(false)

const { loadMore, height } = props

const elementToObserve = ref<HTMLElement | null>(null)

const scrollTrigger = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !isLoading.value) {
        isLoading.value = true
        await loadMore()
        isLoading.value = false
      }
    })
  })
  observer.observe(elementToObserve.value as HTMLElement)
}

const checkIsNum = (height: number = 0) => {
  if (typeof height === 'number' && height > 0) {
    return height + 'px'
  }

  return undefined
}

onMounted(() => {
  scrollTrigger()
})
</script>

<style scoped>
.infinite-scroll {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
}

.infinite-scroll::-webkit-scrollbar {
  scrollbar-color: #7a7a7a;
  scrollbar-width: thin;
  width: 4px;
}

.infinite-scroll::-webkit-scrollbar-track {
  background: #7a7a7a;
  border-radius: 10px;
}

.infinite-scroll::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 10px;
  width: 2px;
}

.intersection-trigger {
  height: 1px;
}

.loader-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
