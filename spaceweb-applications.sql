-- Таблица заявок для MySQL на Spaceweb
-- Выполните этот скрипт в phpMyAdmin (вкладка «SQL») после создания базы данных.

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cargo_type VARCHAR(500) NOT NULL COMMENT 'Тип груза',
  from_location VARCHAR(500) NOT NULL COMMENT 'Откуда',
  to_location VARCHAR(500) NOT NULL COMMENT 'Куда',
  phone VARCHAR(100) NOT NULL COMMENT 'Телефон',
  company_name VARCHAR(500) NOT NULL DEFAULT '' COMMENT 'Название компании',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата заявки'
);

-- Индекс по дате для удобной выборки
CREATE INDEX idx_created_at ON applications(created_at DESC);
