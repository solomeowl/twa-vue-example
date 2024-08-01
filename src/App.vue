<template>
  <div id="app">
    <h1>TWA Wallet Connect Example</h1>
    <TelegramButton />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import TelegramButton from './components/TelegramButton.vue'
import { initTelegramWebApp } from './telegramWebApp'

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