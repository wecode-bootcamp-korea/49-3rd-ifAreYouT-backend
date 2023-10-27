-- migrate:up
CREATE TABLE `promotions` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `promotions`;