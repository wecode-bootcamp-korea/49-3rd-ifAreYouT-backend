-- migrate:up
INSERT INTO seat_grades (`grade`, `price`, `stage_id`) VALUES ('R', '200000', 1),('S', '180000', 1),('A', '160000',1),('C', '140000',1); 

-- migrate:down

