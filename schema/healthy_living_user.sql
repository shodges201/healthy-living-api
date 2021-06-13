CREATE TABLE healthy_living_user(
	id SERIAL PRIMARY KEY,
	username VARCHAR(255),
	email VARCHAR(255),
	okta_id VARCHAR(255),
	phone_number VARCHAR(15),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	created_date TIMESTAMP WITH TIME ZONE
)