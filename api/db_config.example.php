<?php
/**
 * Пример настроек подключения к MySQL на Spaceweb.
 * Скопируйте этот файл как db_config.php и подставьте свои данные из панели Spaceweb.
 * Файл db_config.php не публикуйте в открытом доступе (он уже в .gitignore).
 */

return [
    'host'     => 'localhost',           // Обычно localhost для MySQL на том же хостинге
    'dbname'   => 'ваша_база_данных',   // Имя БД из панели Spaceweb
    'username' => 'ваш_пользователь',   // Пользователь MySQL из панели
    'password' => 'ваш_пароль',         // Пароль пользователя MySQL
    'charset'  => 'utf8mb4',
];
