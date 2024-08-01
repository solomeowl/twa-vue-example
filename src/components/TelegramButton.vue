<template>
    <button @click="closeApp">Close TWA</button>
</template>

<script>
import { closeTelegramWebApp } from '../telegramWebApp'

export default {
    name: 'TelegramButton',
    methods: {
        closeApp() {
            closeTelegramWebApp()
        }
    }
}
</script>

<style scoped>
button {
    padding: 10px 20px;
    background-color: #54A9EB;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>