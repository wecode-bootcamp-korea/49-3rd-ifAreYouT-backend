-- migrate:up
CREATE TABLE `stages` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `location_lat` float,
  `location_lon` float
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `stages`;