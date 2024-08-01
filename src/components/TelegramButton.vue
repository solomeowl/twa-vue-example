<template>
    <div>
        <button @click="closeApp">Close TWA</button>
        <button @click="expandApp">Expand TWA</button>
        <button @click="connectWallet">Connect Wallet</button>
        <p v-if="walletAddress">Wallet Address: {{ walletAddress }}</p>
    </div>
</template>

<script>
import { ref } from 'vue'
import { closeTelegramWebApp, expandTelegramWebApp } from '../telegramWebApp'

export default {
    name: 'TelegramButton',
    setup() {
        const walletAddress = ref('')
        const connector = new window.TonConnect({
            manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json'
        })

        const closeApp = () => {
            closeTelegramWebApp()
        }

        const expandApp = () => {
            expandTelegramWebApp()
        }

        const connectWallet = async () => {
            try {
                const walletConnectionSource = {
                    universalLink: 'https://app.tonkeeper.com/ton-connect',
                    bridgeUrl: 'https://bridge.tonapi.io/bridge'
                }
                await connector.connect(walletConnectionSource)

                const walletInfo = await connector.getWalletInfo()
                if (walletInfo) {
                    walletAddress.value = walletInfo.address
                }
            } catch (error) {
                console.error('Failed to connect wallet:', error)
            }
        }

        return {
            walletAddress,
            closeApp,
            expandApp,
            connectWallet
        }
    }
}
</script>