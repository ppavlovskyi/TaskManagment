# My Microservices Application

## Description

This project contains three microservices: authentication-service, task-management-service, and notification-service. The project uses Docker and Docker Compose to manage containers.

## Pre-configuration

The app includes pre-configured user accounts to test the real-time notifications feature.

## Setup and Launch

### Requirements

- Docker
- Docker Compose

### Installation Steps

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/ppavlovskyi/TaskManagment.git
    cd TaskManagment
    ```

2. **Create `.env` Files:**

    Create a `.env` file in the root of each service and add the necessary environment variables.

    **Example for `authentication-service` (`authentication-service/.env`):**

    ```env
    MONGODB_USERNAME=your_mongodb_username
    MONGODB_PASSWORD=your_mongodb_password
    MONGODB_URL=your_mongodb_url
    MONGODB_NAME=your_mongodb_name
    JWT_SECRET=your_jwt_secret
    ```

    **Example for `task-management-service` (`task-management-service/.env`):**

    ```env
    MONGODB_USERNAME=your_mongodb_username
    MONGODB_PASSWORD=your_mongodb_password
    MONGODB_URL=your_mongodb_url
    MONGODB_NAME=your_mongodb_name
    ```

    **Example for `notification-service` (`notification-service/.env`):**

    ```env
    MONGODB_USERNAME=your_mongodb_username
    MONGODB_PASSWORD=your_mongodb_password
    MONGODB_URL=your_mongodb_url
    MONGODB_NAME=your_mongodb_name
    ```

    **Example for `frontend` (`frontend/.env`):**

    ```env
    REACT_APP_USER_URL=http://localhost:8080
    REACT_APP_TASK_URL=http://localhost:8081
    REACT_APP_NOTIFICATION_URL=http://localhost:8082
    ```

3. **Run Docker Compose:**

    ```sh
    docker-compose up --build
    ```

    This will build and run all microservices and initialize user accounts.

## Access to Services

- **Authentication Service:** [http://localhost:8080](http://localhost:8080)
- **Task Management Service:** [http://localhost:8081](http://localhost:8081)
- **Notification Service:** [http://localhost:8082](http://localhost:8082)
- **Frontend:** [http://localhost:3000](http://localhost:3000)

## Pre-configured Accounts

- `user1@test.com` / `password1`
- `user2@test.com` / `password2`
- `user3@test.com` / `password3`
- `user1@test.com4` / `password4`

## License

[Include license details here]

---
