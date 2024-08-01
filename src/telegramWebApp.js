import WebApp from '@twa-dev/sdk'

export const initTelegramWebApp = () => {
  WebApp.ready()
}

export const closeTelegramWebApp = () => {
  WebApp.close()
}