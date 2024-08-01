<template>
  <div id="app">
    <TonConnectUIProvider>
      <TelegramButton />
    </TonConnectUIProvider>
  </div>
</template>

<script>
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import TelegramButton from './components/TelegramButton.vue'

export default {
  name: 'App',
  components: {
    TonConnectUIProvider,
    TelegramButton
  }
}
</script>