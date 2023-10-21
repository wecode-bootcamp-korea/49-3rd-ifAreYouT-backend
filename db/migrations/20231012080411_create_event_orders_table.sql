-- migrate:up
CREATE TABLE `event_orders` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `order_name` varchar(20),
  `ticket_code` varchar(200),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  `time_id` integer NOT NULL,
  `seat_id` integer NOT NULL, 
  `order_id` integer NOT NULL,
  FOREIGN KEY (`time_id`) REFERENCES `times` (`id`),
  FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  UNIQUE KEY `seat_time_order` (`seat_id`, `order_id`, `time_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `event_orders`;
