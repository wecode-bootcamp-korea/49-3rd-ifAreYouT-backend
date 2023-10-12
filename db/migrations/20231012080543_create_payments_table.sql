-- migrate:up
CREATE TABLE `payments` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL,
  `status` enum('pending', 'processing', 'success', 'failed') NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` integer NOT NULL,
  `order_id` integer NOT NULL,
  `method_id` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  FOREIGN KEY (`method_id`) REFERENCES `payment_methods` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `payments`;