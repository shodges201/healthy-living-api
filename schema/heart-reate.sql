CREATE TABLE heart_rate(
	id serial PRIMARY KEY,
	rate INT,
	date date,
	user_id INT,
	CONSTRAINT fk_user_id
      FOREIGN KEY(user_id) 
	  REFERENCES healthy_living_user(id)
)