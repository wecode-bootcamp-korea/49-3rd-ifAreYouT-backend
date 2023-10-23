-- migrate:up
CREATE TABLE `seats` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `row_name` varchar(10) NOT NULL,
  `col_name` integer NOT NULL,
  `stage_id` integer NOT NULL,
  `grade_id` integer NOT NULL,
  FOREIGN KEY (`stage_id`) REFERENCES `stages` (`id`),
  FOREIGN KEY (`grade_id`) REFERENCES `seat_grades` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `seats`;

