-- migrate:up
CREATE TABLE `seats` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `line` integer NOT NULL,
  `stage_id` integer NOT NULL,
  FOREIGN KEY (`stage_id`) REFERENCES `stages` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `seats`;

