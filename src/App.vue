<template>
  <div id="app">
    <h1>TWA Wallet Connect Example</h1>
    <p>Environment: {{ environment }}</p>
    <TelegramButton />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import TelegramButton from './components/TelegramButton.vue'
import { initTelegramWebApp } from './telegramWebApp'

export default {
  name: 'App',
  components: {
    TelegramButton
  },
  setup() {
    const environment = ref('Unknown')

    onMounted(() => {
      console.log('App mounted')
      try {
        initTelegramWebApp()
        environment.value = 'Telegram WebApp'
      } catch (e) {
        console.error('Failed to initialize Telegram WebApp:', e)
        environment.value = 'Browser'
      }
    })

    return {
      environment
    }
  }
}
</script>