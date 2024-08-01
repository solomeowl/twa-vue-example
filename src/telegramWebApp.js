import WebApp from '@twa-dev/sdk'

export const initTelegramWebApp = () => {
  WebApp.ready()
}

export const closeTelegramWebApp = () => {
  WebApp.close()
}

// 添加其他您可能需要的 TWA 功能