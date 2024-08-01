<template>
    <div class="telegram-buttons">
        <button @click="closeApp">Close TWA</button>
        <button @click="expandApp">Expand TWA</button>
        <button @click="connectWallet">Connect Wallet</button>
        <p v-if="walletAddress">Wallet Address: {{ walletAddress }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { closeTelegramWebApp, expandTelegramWebApp } from '../telegramWebApp'
import TonConnect from '@tonconnect/sdk'

export default {
    name: 'TelegramButton',
    setup() {
        const walletAddress = ref('')
        const error = ref('')
        let connector

        onMounted(() => {
            console.log('TelegramButton mounted')
            connector = new TonConnect({
                manifestUrl: 'https://your-app-domain.com/tonconnect-manifest.json'
            })
        })

        const closeApp = () => {
            console.log('Closing app')
            closeTelegramWebApp()
        }

        const expandApp = () => {
            console.log('Expanding app')
            expandTelegramWebApp()
        }

        const connectWallet = async () => {
            console.log('Connecting wallet')
            try {
                const walletConnectionSource = {
                    universalLink: 'https://app.tonkeeper.com/ton-connect',
                    bridgeUrl: 'https://bridge.tonapi.io/bridge'
                }
                await connector.connect(walletConnectionSource)

                const walletInfo = await connector.getWalletInfo()
                if (walletInfo) {
                    walletAddress.value = walletInfo.address
                    console.log('Wallet connected:', walletAddress.value)
                }
            } catch (e) {
                console.error('Failed to connect wallet:', e)
                error.value = e.message
            }
        }

        return {
            walletAddress,
            error,
            closeApp,
            expandApp,
            connectWallet
        }
    }
}
</script>

<style scoped>
.telegram-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

button {
    padding: 10px;
    font-size: 16px;
}
</style>