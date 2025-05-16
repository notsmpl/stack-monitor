# Stock Market Analytics Dashboard

React-приложение для анализа фондового рынка с использованием Twelve Data API

## Функционал

- Просмотр котировок акций в реальном времени
- Исторические данные с графиками
- Технические индикаторы (RSI, MACD)
- Фильтрация и сортировка акций

## Технологии

- React 18
- TypeScript
- Next.js
- Axios

## Установка

1. Клонировать репозиторий:
   ```bash
   git clone https://github.com/notsmpl/stack-monitor
   ```

2. Установить зависимости:
   ```bash
   npm install
   ```

3. Создать файл `.env.local` и добавить API-ключ:
   ```env
   NEXT_PUBLIC_TWELVEDATA_API_KEY=ваш_ключ
   ```

4. Запустить приложение:
   ```bash
   npm run dev
   ```
