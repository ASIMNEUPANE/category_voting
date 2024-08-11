# Overview

The Category Voting API is a backend application that allows users to manage categories and vote on them. The project uses Node.js, Express, and Sequelize ORM to provide a robust and scalable solution for handling hierarchical categories and user votes. The application is designed to support both development and production environments using Docker.

# Features

1. CRUD Operations: Create, Read, Update, and Delete operations for categories.
2. Hierarchical Categories: Support for nested categories (parent, child, grandchild).
3. Voting Mechanism: Users can vote for categories, with votes aggregated to determine top categories.
4. Database Management: Managed with Sequelize ORM and MySQL.
5. Dockerized Application: Facilitates easy setup and deployment in development and production environments.
6. Rate Limiting: Prevents abuse by limiting API requests.
7. Compression: Reduces response sizes for better performance.
8. Helmet Security & SSH/HTTPS: Secures HTTP headers and communication.
9. Testing with Jest: Ensures code reliability through unit testing.

## Technologies Used

1.  Node.js: JavaScript runtime for scalable server-side applications.
2.  Express: Web framework for handling routing and middleware.
3.  Sequelize ORM: Manages MySQL databases, migrations, and seed data.
4.  MySQL: Relational database management system.
5.  Docker & Docker Compose: Containerization and multi-container orchestration.
6.  Rate Limiting: Prevents excessive API requests.
7.  Compression: Improves performance by reducing response sizes.
8.  Helmet & SSH/HTTPS: Secures HTTP headers and encrypted communication.
9.  Jest: Testing framework for unit, integration, and snapshot testing.
10. Husky: Enforces code quality with pre-commit checks.
11. Zod: TypeScript-first schema validation library.
12. ESLint & Prettier: Combines static code analysis and automatic formatting.
13. TypeScript: Adds static typing to JavaScript for enhanced code quality.

## Setup and Installation

# Prerequisites

Ensure you have the following installed:

1. Docker
2. Docker Compose

# Getting Started

1. Clone the Repository

`git clone <git@github.com:ASIMNEUPANE/category_voting.git>`

2.Build and Run the Docker Containers

`docker compose up --build`

This command builds Docker images and starts the containers defined in docker-compose.yml.

3. Access the Application

Once the containers are running, you can access the application at:

1. Development Environment: `http://localhost:3333`

2. Production Environment: `https://localhost:3333` (if HTTPS is configured)

MySQL will be available on port 3307 and can be accessed through the my_db container.

4. Running Migrations and Seeds

`docker exec -it <container-id> npx sequelize-cli db:migrate`

`docker exec -it <container-id> npx sequelize-cli db:seed:all`

Replace <container-id> with the actual ID or name of your running container.

## Challenges Faced

1. Learning Curve with Sequelize ORM: Adapting to Sequelize for managing hierarchical data and database migrations presented a steep learning curve.

2. Handling Hierarchical Data: Managing self-referencing relationships required careful planning.

## Future Enhancements

1. User Authentication: Implement user authentication and authorization to manage votes and categories more securely.

2. API Documentation: Generate and maintain API documentation for better developer experience and usage clarity.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements for the project.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
