import WebApp from '@twa-dev/sdk';

export const initTelegramWebApp = () => {
  console.log('Initializing Telegram Web App');
  WebApp.ready();
}

export const closeTelegramWebApp = () => {
  console.log('Closing Telegram Web App');
  WebApp.close();
}

export const expandTelegramWebApp = () => {
  console.log('Expanding Telegram Web App');
  WebApp.expand();
}