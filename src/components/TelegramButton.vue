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
                manifestUrl: 'https://solomeowl.github.io/twa-vue-example/tonconnect-manifest.json'
            })

            connector.onStatusChange(walletInfo => {
                if (walletInfo) {
                    walletAddress.value = walletInfo.account.address
                    console.log('Wallet connected:', walletAddress.value)
                } else {
                    walletAddress.value = ''
                    console.log('Wallet disconnected')
                }
            })

            restoreConnection()
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

                // 生成連接 URL
                const url = await connector.connect(walletConnectionSource)

                // 在 Telegram WebApp 中打開 URL
                if (window.Telegram && window.Telegram.WebApp) {
                    window.Telegram.WebApp.openLink(url)
                } else {
                    // 如果不在 Telegram WebApp 環境中，就在新窗口中打開
                    window.open(url, '_blank')
                }
            } catch (e) {
                console.error('Failed to connect wallet:', e)
                error.value = e.message
            }
        }

        const restoreConnection = async () => {
            try {
                await connector.restoreConnection()
            } catch (e) {
                console.error('Failed to restore connection:', e)
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