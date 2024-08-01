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

// 你可以根據需要添加更多的函數
export const isExpanded = () => {
  return TWA.isExpanded;
}

export const sendData = (data) => {
  TWA.sendData(data);
}
