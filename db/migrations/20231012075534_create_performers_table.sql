-- migrate:up
CREATE TABLE `performers` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `performers`;