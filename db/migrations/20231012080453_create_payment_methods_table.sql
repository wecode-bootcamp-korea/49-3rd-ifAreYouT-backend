-- migrate:up
CREATE TABLE `payment_methods` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `method` varchar(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `payment_methods`