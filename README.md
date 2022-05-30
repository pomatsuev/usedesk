Запуск:

1) Копируем .env.example в .env
2) Собираем образы и запускаем:
```shell
docker-compose build
docker-compose up -d
```

3) Установка зависимостей composer:
```shell
docker-compose exec app composer install
```

4) Установка ключа приложения:
```shell
docker-compose exec app php artisan key:generate
```

5) Миграции:
```shell
docker-compose exec app php artisan migrate
```

6) Запонение ДБ: добавляет пользователя с почтой `test@test.ru` и паролем `test`
```shell
docker-compose exec app php artisan db:seed
```
Все должно работать на localhost:80

Дизайн минималистичен ))
