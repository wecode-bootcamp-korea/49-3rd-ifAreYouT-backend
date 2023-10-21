-- migrate:up
CREATE TABLE `event_seats` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `status` enum('available', 'reserved', 'disabled') NOT NULL,
  `event_id` integer NOT NULL,
  `seat_id` integer NOT NULL,
  FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `event_seats`;