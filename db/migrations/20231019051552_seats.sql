-- migrate:up
ALTER TABLE seats CHANGE COLUMN `row` row_name VARCHAR(10) NOT NULL;
ALTER TABLE seats CHANGE COLUMN col col_name integer NOT NULL; 

-- migrate:down
ALTER TABLE seats CHANGE COLUMN row_name `row` VARCHAR(10) NOT NULL;
ALTER TABLE seats CHANGE COLUMN col_name col integer NOT NULL;
