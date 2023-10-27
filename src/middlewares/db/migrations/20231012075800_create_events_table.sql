-- migrate:up
CREATE TABLE `events` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `playtime` varchar(10) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  `description` text,
  `status` enum('merchantable', 'merchandise') NOT NULL,
  `start_date` TIMESTAMP NOT NULL,
  `end_date` TIMESTAMP NOT NULL,
  `sales_start_date` TIMESTAMP NOT NULL,
  `sales_end_date` TIMESTAMP NOT NULL,
  `stage_id` integer NOT NULL,
  `category_id` integer NOT NULL,
  `performer_id` integer NOT NULL,
  `promotion_id` integer NOT NULL,
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  FOREIGN KEY (`stage_id`) REFERENCES `stages` (`id`),
  FOREIGN KEY (`performer_id`) REFERENCES `performers` (`id`),
  FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `events`;

