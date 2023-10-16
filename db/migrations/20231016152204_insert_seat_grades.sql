-- migrate:up
INSERT INTO seat_grades (`grade`, `price`) VALUES ('R', '200000'),('S', '180000'),('A', '160000'),('C', '140000'); 

-- migrate:down

