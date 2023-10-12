-- migrate:up
CREATE TABLE `times` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `event_time` time NOT NULL,
  `event_day` TIMESTAMP,
  `event_id` integer NOT NULL,
  FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `times`;