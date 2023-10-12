-- migrate:up
CREATE TABLE `seat_grades` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `grade` char(1) NOT NULL,
  `price` decimal NOT NULL,
  `seat_id` integer NOT NULL,
  FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `seat_grades`;