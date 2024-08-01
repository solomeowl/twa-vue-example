<template>
  <div id="app">
    <!-- 其他的應用內容 -->
    <TelegramButton />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { initTelegramWebApp } from './telegramWebApp'
import TelegramButton from './components/TelegramButton.vue'

export default {
  name: 'App',
  components: {
    TelegramButton
  },
  setup() {
    onMounted(() => {
      initTelegramWebApp()
    })
  }
}
</script>