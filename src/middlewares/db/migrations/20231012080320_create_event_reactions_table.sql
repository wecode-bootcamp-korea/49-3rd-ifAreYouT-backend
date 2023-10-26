-- migrate:up
CREATE TABLE `event_reactions` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `reaction_type` enum('exited', 'unexited') NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  `event_id` integer,
  `user_id` integer,
 FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
 FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
 UNIQUE KEY `user_event` (`user_id`, `event_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `event_reactions`