<template>
  <div id="app">
    <!-- 您的應用內容 -->
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { initTelegramWebApp } from './telegramWebApp'

export default {
  name: 'App',
  setup() {
    onMounted(() => {
      initTelegramWebApp()
    })
  }
}
</script>