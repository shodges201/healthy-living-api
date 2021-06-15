CREATE TABLE ldl(
	id serial PRIMARY KEY,
	level INT,
	date date DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	CONSTRAINT fk_user_id
      FOREIGN KEY(user_id) 
	  REFERENCES healthy_living_user(id)
)