## Category Voting API
# Overview
The Category Voting API is a backend application that allows users to manage categories and vote on them. The project uses Node.js, Express, and Sequelize ORM to provide a robust and scalable solution for handling hierarchical categories and user votes. The application is designed to support both development and production environments using Docker.

# Features
1. CRUD Operations: Create, Read, Update, and Delete operations for categories.
2. Hierarchical Categories: Support for nested categories (parent, child, grandchild).
3. Voting Mechanism: Users can vote for categories, and votes are aggregated to determine top categories.
4. Database Management: Seamless management of categories and votes using Sequelize ORM with MySQL.
5. Dockerized Application: Easy setup and deployment with Docker, supporting both development and production environments.

## Technologies Used
1. Node.js: JavaScript runtime for building scalable server-side applications.
2. Express: Web framework for Node.js to handle routing and middleware.
3. Sequelize ORM: ORM for managing MySQL databases and handling migrations and seed data.
4. MySQL: Relational database management system for storing application data.
5. Docker: Containerization platform for building, deploying, and running applications.
6. Docker Compose: Tool for defining and running multi-container Docker applications.

# Setup and Installation
Prerequisites
Docker
Docker Compose
Docker Setup
Clone the Repository

bash
Copy code
git clone <repository-url>
cd <project-directory>
Build and Run the Containers

Run the following command to build and start the application and MySQL service:

``bash
Copy code
docker compose up --build``

This command will build the Docker images and start the containers based on the configuration in the docker-compose.yml file.

Access the Application

The application will be accessible at http://localhost:3333.
MySQL will be running on port 3307, and it will be accessible through the my_db container.
Running Migrations and Seeds

Development Environment: Migrations and seeds are run automatically when the container starts.
Production Environment: You may need to manage migrations and seeds manually or use startup scripts.
To manually run migrations and seeds, you can use the following commands within the running container:

bash
Copy code
docker exec -it <container-id> npx sequelize-cli db:migrate
docker exec -it <container-id> npx sequelize-cli db:seed:all
Project Structure
src/: Contains the source code for the application.
models/: Sequelize models for categories and votes.
controllers/: Business logic for handling API requests.
migrations/: Sequelize migrations for database schema changes.
seeders/: Sequelize seeders for populating the database with initial data.
config/: Configuration files for database and other settings.
Dockerfile: Dockerfile for building application images.
docker-compose.yml: Docker Compose configuration for multi-container setup.

## Challenges Faced
1. Handling Hierarchical Data: Managing self-referencing relationships in Sequelize for hierarchical categories required careful planning and execution.
2. Database Migrations: Ensuring smooth database migrations and seed data integration while maintaining data integrity across development and production environments.
3. Docker Configuration: Setting up Docker and Docker Compose for both development and production environments with efficient handling of dependencies and migrations.

## Future Enhancements
1. User Authentication: Implement user authentication and authorization to manage votes and categories more securely.
2. API Documentation: Generate and maintain API documentation for better developer experience and usage clarity.

Contributing
Feel free to open issues or submit pull requests if you have suggestions or improvements for the project.

License
This project is licensed under the MIT License. See the LICENSE file for details.

