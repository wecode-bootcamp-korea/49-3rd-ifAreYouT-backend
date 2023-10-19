-- migrate:up
INSERT INTO events (`title`, `playtime`, `description`, `status`, `start_date`, `end_date`, `sales_start_date`, `sales_end_date`, `stage_id`, `category_id`, `performer_id`) VALUES 
('아리아나 그란데 내한', '2시간', '어쩌구저쩌구', 'merchantable', '2023-08-01', '2023-09-01','2023-08-01', '2023-09-01', 1, 1, 1);
-- migrate:down

