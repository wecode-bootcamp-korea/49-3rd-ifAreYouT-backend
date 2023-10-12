-- migrate:up
CREATE TABLE `promotion_questions` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `promotion_id` integer NOT NULL,
  FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `promotion_questions`;