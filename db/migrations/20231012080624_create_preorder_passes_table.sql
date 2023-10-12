-- migrate:up
CREATE TABLE `preorder_passes` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `event_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `created_at` TIMESTAMP,
  `deleted_at` TIMESTAMP,
  FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `preorder_passes`;