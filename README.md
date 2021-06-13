
# Healthy Living API

#### -- Project Status: Active

## Project Intro/Objective
Healthy Living is a project intended to help users easily track their vital health indicators such as cholesterol, resting heart rate, etc.

### Technologies
* TypeScript
* Node.js
* Express.js
* Postgres

## Project Description
This is the backend for a project inteded to be used to track health indicators. It is a REST API that uses a node/express server runtime environment implemented with Typescript along with a Postgres database for storing the information sent by users. 


## Getting Started

1. Clone this repo (for help see this [tutorial](https://help.github.com/articles/cloning-a-repository/)).
2. Using your console/terminal traverse into the local repo you just cloned.
3. Run the command *npm i* and wait for npm to finish downloading the node modules. Note there should now be a folder titled *node_modules* in the local repos base directory. If you need to install npm, you can download node.js and npm from here: https://nodejs.org/en/.
4. To easily create a Postgres database server run the following Docker command if you have docker installed on your machine ```` docker run --name some-postgres -e POSTGRES_PASSWORD=<mysecretpassword> -d postgres````
5. Create the necessary tables by running the .sql files in the /schema directory
6. Create an Okta account and application (more detailed description to come).
5. Make a copy of the .sample-env in the root of the project and name it `.env`.
6. Fill in the values to fit your needs in the `.env` file.
7. Run the command `npm start` in your console/terminal and a window in your default web browser should open with the address *localhost:8080/*.
8. If you have any issues following any of these instructions, reach out to me, my info is in the **contact** section.

## Build directions
1. Navigate to the base directory of the project.
2. Make a production version of the .env file named `.env.production` in the base directory of the project.
2. Run the command `docker build -t <image name>:<tag> .`
3. Run the app using the command ````docker run -p 8080:8080 --env-file .env.production <image name>:<tag>````
4. Alternatively push the docker image to a repo using ````docker push  <image name>:<tag>```` 
5. Update the image name and version in the docker-compose.yml file and run it using ```` docker-compose up -d````.
6. Note there must be a postgres database with the schema created as in step 4-5 of *Getting Started* and an Okta account must be created as stated in step 6 of *Getting Started*.


## Contributing Members
* **Scott Hodges shodges@gmail.com**
