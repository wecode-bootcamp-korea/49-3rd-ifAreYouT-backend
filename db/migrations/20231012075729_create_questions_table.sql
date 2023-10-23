-- migrate:up
CREATE TABLE `questions` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `performer_question` varchar(512) NOT NULL,
  `performer_answer` tinyint NOT NULL,
  `promotion_question_id` integer NOT NULL,
  FOREIGN KEY (`promotion_question_id`) REFERENCES `promotion_questions` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `questions`;

