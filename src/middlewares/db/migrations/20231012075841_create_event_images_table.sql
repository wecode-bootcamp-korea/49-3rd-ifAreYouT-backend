-- migrate:up
CREATE TABLE `event_images` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `event_id` integer NOT NULL,
  `detail_image_url` varchar(512),
  `thumbnail_image_url` varchar(512),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `event_images`;

