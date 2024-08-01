const TWA = window.Telegram.WebApp;

export const initTelegramWebApp = () => {
  TWA.ready();
}

export const closeTelegramWebApp = () => {
  TWA.close();
}

export const expandTelegramWebApp = () => {
  TWA.expand();
}