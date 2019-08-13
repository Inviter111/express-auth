В корне создать файл config.local.json по шаблону из config.template.json

Выполнить
```
yarn
yarn dev
```

или

```
npm i
npm run dev
```

При первом запуске создаст три пользователя в БД со следующими данными

| Login | Password |
| ----- | -------- |
| admin | admin |
| contract_viewer | contract_viewer |
| contract_editor | contract_editor |
