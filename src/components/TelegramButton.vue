<template>
    <div class="telegram-buttons">
        <button @click="closeApp">Close TWA</button>
        <button @click="expandApp">Expand TWA</button>
        <button v-if="!walletAddress" @click="connectWallet">Connect Wallet</button>
        <button v-else @click="disconnectWallet">Disconnect Wallet</button>
        <button v-if="walletAddress" @click="signMessage">Sign Message</button>
        <p v-if="walletAddress">Wallet Address: {{ formattedAddress }}</p>
        <p v-if="signature">Signature: {{ signature }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { closeTelegramWebApp, expandTelegramWebApp } from '../telegramWebApp'
import TonConnect from '@tonconnect/sdk'
import TonWeb from 'tonweb'

export default {
    name: 'TelegramButton',
    setup() {
        const walletAddress = ref('')
        const error = ref('')
        const signature = ref('')
        let connector

        const formattedAddress = computed(() => {
            if (walletAddress.value) {
                return new TonWeb.utils.Address(walletAddress.value).toString(true, true, true)
            }
            return ''
        })

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
                    signature.value = ''
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

                const url = await connector.connect(walletConnectionSource)

                if (window.Telegram && window.Telegram.WebApp) {
                    window.Telegram.WebApp.openLink(url)
                } else {
                    window.open(url, '_blank')
                }
            } catch (e) {
                console.error('Failed to connect wallet:', e)
                error.value = e.message
            }
        }

        const disconnectWallet = async () => {
            console.log('Disconnecting wallet')
            try {
                await connector.disconnect()
                walletAddress.value = ''
                signature.value = ''
            } catch (e) {
                console.error('Failed to disconnect wallet:', e)
                error.value = e.message
            }
        }

        const signMessage = async () => {
            console.log('Signing message')
            try {
                const messageToSign = 'Hello, TON!'

                const transaction = {
                    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 seconds from now
                    messages: [
                        {
                            address: '0:0000000000000000000000000000000000000000000000000000000000000000',
                            amount: '0',
                            payload: Buffer.from(messageToSign).toString('hex')
                        }
                    ]
                }

                const result = await connector.sendTransaction(transaction)

                if (result) {
                    signature.value = `Transaction BOC: ${result.boc}`
                    console.log('Message signed:', result)
                } else {
                    throw new Error('Signing failed or was cancelled')
                }
            } catch (e) {
                console.error('Failed to sign message:', e)
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
            formattedAddress,
            error,
            signature,
            closeApp,
            expandApp,
            connectWallet,
            disconnectWallet,
            signMessage
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