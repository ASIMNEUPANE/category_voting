## Category Voting API
# Overview
The Category Voting API is a backend application that allows users to manage categories and vote on them. The project uses Node.js, Express, and Sequelize ORM to provide a robust and scalable solution for handling hierarchical categories and user votes. The application is designed to support both development and production environments using Docker.

# Features
1. CRUD Operations: Create, Read, Update, and Delete operations for categories.
2. Hierarchical Categories: Support for nested categories (parent, child, grandchild).
3. Voting Mechanism: Users can vote for categories, and votes are aggregated to determine top categories.
4. Database Management: Seamless management of categories and votes using Sequelize ORM with MySQL.
5. Dockerized Application: Easy setup and deployment with Docker, supporting both development and production environments.
6. Rate Limiting: Implemented rate limiting to prevent abuse and ensure fair usage of API endpoints.
7. Compression: Added compression to reduce the size of responses and improve performance.
8. Helmet Security & SSH/HTTPS: Integrated Helmet to secure HTTP headers and enhance application security, while configuring SSH/HTTPS for secure communication and data transfer.

## Technologies Used
1. Node.js: JavaScript runtime for building scalable server-side applications.
2. Express: Web framework for Node.js to handle routing and middleware.
3. Sequelize ORM: ORM for managing MySQL databases and handling migrations and seed data.
4. MySQL: Relational database management system for storing application data.
5. Docker: Containerization platform for building, deploying, and running applications.
6. Docker Compose: Tool for defining and running multi-container Docker applications.
7. Rate Limiting: Prevents abuse by limiting the number of requests from a single IP address.
8. Compression: Reduces response sizes and improves performance by compressing HTTP responses.
9. HTTP Security: Secures HTTP headers with Helmet to protect against common web vulnerabilities.
10. SSH/HTTPS: Ensures secure communication with SSH for server management and HTTPS for secure web traffic.

## Setup and Installation
# Prerequisites
Before you begin, ensure you have the following installed:


1. Docker
2. Docker Compose
Docker Setup

# Getting Started

1. Clone the Repository
First, clone the project repository to your local machine:

``git clone <git@github.com:ASIMNEUPANE/category_voting.git>``

2.Build and Run the Docker Containers
Run the following command to build and start the application and MySQL service:

``docker compose up --build``
This command will:

. Build Docker images according to the Dockerfile.
. Start the containers defined in the docker-compose.yml file.

3. Access the Application

Once the containers are running, you can access the application at:

1. Development Environment: ``http://localhost:3333``

2. Production Environment: ``https://localhost:3333`` (if HTTPS is configured)

MySQL will be available on port 3307 and can be accessed through the my_db container.

4. Running Migrations and Seeds 
Migrations and seed data are typically handled when the container starts. However, if needed, you can manually run migrations and seeds with the following commands:

``docker exec -it <container-id> npx sequelize-cli db:migrate``

``docker exec -it <container-id> npx sequelize-cli db:seed:all``

Replace <container-id> with the actual ID or name of your running container.

## Challenges Faced

Since this is my first time using Sequelize ORM, the learning curve is steep, and I still don’t know much. However, I’m looking forward to learning more.

1. Handling Hierarchical Data: Managing self-referencing relationships in Sequelize for hierarchical categories required careful planning and execution.

2.Database Migrations: Ensuring smooth database migrations and seed data integration while maintaining data integrity across development and production environments.

## Future Enhancements
1. User Authentication: Implement user authentication and authorization to manage votes and categories more securely.

2. API Documentation: Generate and maintain API documentation for better developer experience and usage clarity.

Contributing
Feel free to open issues or submit pull requests if you have suggestions or improvements for the project.

License
This project is licensed under the MIT License. See the LICENSE file for details.

