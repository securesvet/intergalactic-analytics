# Межгалактическая аналитика

## Getting started

Чтобы запустить приложение, нужно написать две команды:

```
npm install
npm run dev
```

## Структура проекта

### src/assets

Тут находятся все ассеты, которые используются в основном для создания
компонентов иконок для Реакта

### src/components/ui

Здесь находятся все "неумные" компоненты, которые обладают базовой логикой
отрисовки

### src/components/icons

Иконки, можно использовать как реакт-компоненты

### src/store

Стор, созданный для использования zustand, тут хранится бизнес-логика

### src/pages/

Здесь находятся все компоненты для отображения в качестве целой или части
страницы, за исключением модального окна

### src/index.css/

Все базовые стили, переменные описаны здесь

### configuration files

Файлы конфигурации в корне проекта: eslint + prettier

## Tests

Тесты находятся по пути `src/tests`

Чтобы запустить тесты надо прописать `npm run test`

### Используемые технологии:

В основном исползьуются только `playwright`, `vitest`

Чтобы смотреть coverage report, скорее всего придётся поставить бинарники браузеров с помощью `npx playwright install`
