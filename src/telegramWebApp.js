import * as TWA from '@twa-dev/sdk'

export const initTelegramWebApp = () => {
  TWA.ready()
}

export const closeTelegramWebApp = () => {
  TWA.close()
}

export const expandTelegramWebApp = () => {
  TWA.expand()
}