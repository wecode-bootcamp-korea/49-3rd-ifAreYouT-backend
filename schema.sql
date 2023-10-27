

CREATE TABLE `orders` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `order_no` varchar(255) NOT NULL,
  `order_status` enum NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `event_orders` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT
  `time_id` integer,
  `seat_id` integer,
  `order_name` varchar(20),
  `ticket_code` varchar(200),
  `order_id` integer,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`time_id`) REFERENCES `times` (`id`),
  FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  UNIQUE KEY `seat_time_order` (`seat_id`, `order_id`, `time_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `payment_methods` (
  `id` integer,
  `method` varchar(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `payments` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `order_id` integer NOT NULL,
  `amount` float NOT NULL,
  `method_id` integer,
  `status` enum NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  FOREIGN KEY (`method_id`) REFERENCES `payment_methods` (`id`),
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `preorder_passes` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `event_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `created_at` TIMESTAMP,
  `deleted_at` TIMESTAMP,
  FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





 



