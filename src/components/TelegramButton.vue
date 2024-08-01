<template>
    <div>
        <button @click="closeApp">Close TWA</button>
        <button @click="expandApp">Expand TWA</button>
        <button @click="connectWallet">Connect Wallet</button>
        <p v-if="walletAddress">Wallet Address: {{ walletAddress }}</p>
    </div>
</template>

<script>
import { closeTelegramWebApp } from '../telegramWebApp'
import WebApp from '@twa-dev/sdk'
import TonConnect from '@tonconnect/sdk'

export default {
    name: 'TelegramButton',
    data() {
        return {
            walletAddress: '',
            connector: null
        }
    },
    mounted() {
        this.connector = new TonConnect({
            manifestUrl: 'https://your-app-domain.com/tonconnect-manifest.json'
        })
    },
    methods: {
        closeApp() {
            closeTelegramWebApp()
        },
        expandApp() {
            WebApp.expand()
        },
        async connectWallet() {
            try {
                const walletConnectionSource = {
                    universalLink: 'https://app.tonkeeper.com/ton-connect',
                    bridgeUrl: 'https://bridge.tonapi.io/bridge'
                }
                await this.connector.connect(walletConnectionSource)

                const walletInfo = await this.connector.getWalletInfo()
                if (walletInfo) {
                    this.walletAddress = walletInfo.address
                }
            } catch (error) {
                console.error('Failed to connect wallet:', error)
            }
        }
    }
}
</script>