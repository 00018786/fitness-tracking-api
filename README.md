# Fitness Tracking API
https://github.com/00018786/fitness-tracking-api

A RESTful API for tracking fitness activities, built with Node.js, Express, and TypeScript.

## Features

- User management
- Activity tracking
- Workout logging
- Progress monitoring

## API Endpoints

### Users

- `GET /users` - Get all users
  - Response: `[{ "id": number, "name": "string" }]`

- `GET /users/:id` - Get user name by ID
  - URL parameters: `id` (user ID)
  - Response: `{ "name": "string" }`

- `POST /users` - Create a new user
  - Request body: `{ "name": "string" }`
  - Response: `{ "id": number, "name": "string" }`

- `PUT /users/:id` - Update a user
  - URL parameters: `id` (user ID)
  - Request body: `{ "name": "string" }`
  - Response: `{ "id": number, "name": "string" }`

- `DELETE /users/:id` - Delete a user
  - URL parameters: `id` (user ID)
  - Response: 204 No Content

### Activities

- `POST /activities` - Create a new activity
  - Request body: `{ "userId": number, "type": "string", "duration": number, "calories": number }`
  - Response: `{ "id": number, "userId": number, "type": "string", "duration": number, "calories": number, "date": "string" }`

- `GET /activities` - Get all activities
  - Response: Array of activity objects

- `GET /activities/:id` - Get a specific activity
  - URL parameters: `id` (activity ID)
  - Response: Activity object

- `DELETE /activities/:id` - Delete an activity
  - URL parameters: `id` (activity ID)
  - Response: 204 No Content

### Milestones

- `POST /milestones` - Create a new milestone
  - Request body: `{ "userId": number, "title": "string", "description": "string", "date": "string", "type": "string", "achieved": boolean }`
  - Response: `{ "id": number, "userId": number, "title": "string", "description": "string", "date": "string", "type": "string", "achieved": boolean }`

- `GET /milestones` - Get all milestones
  - Response: Array of milestone objects

- `GET /milestones/:id` - Get a specific milestone
  - URL parameters: `id` (milestone ID)
  - Response: Milestone object

- `GET /milestones/user/:userId` - Get milestones by user
  - URL parameters: `userId` (user ID)
  - Response: Array of milestone objects

- `PUT /milestones/:id` - Update a milestone
  - URL parameters: `id` (milestone ID)
  - Request body: `{ "title": "string", "description": "string", "date": "string", "type": "string", "achieved": boolean }`
  - Response: Updated milestone object

- `DELETE /milestones/:id` - Delete a milestone
  - URL parameters: `id` (milestone ID)
  - Response: 204 No Content

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- The API uses a mock database (json-server) for development
- TypeScript for type safety
- Express for routing and middleware
- Axios for HTTP requests

## License

MIT

## Project Structure

```
fitness-tracking-api/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── models/          # Data models
│   ├── services/        # Business logic
│   ├── middlewares/     # Custom middlewares
│   └── index.ts         # Application entry point
├── db.json              # Mock database
├── server.js            # json-server configuration
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd fitness-tracking-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the servers

You have two options to run the project:

#### Option 1: Run both servers together (recommended)

```bash
npm run dev:all
```

This will start:
- Express API on http://localhost:3000
- json-server on http://localhost:3001

#### Option 2: Run servers separately

Terminal 1 (Express API):
```bash
npm run dev
```

Terminal 2 (json-server):
```bash
npm run json-server
```

### 4. Test the API

You can test the API using tools like Postman or curl:

```bash
# Create a new user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe"
  }'

# Delete a user
curl -X DELETE http://localhost:3000/users/1

# Get all milestones
curl http://localhost:3000/milestones

# Get a specific milestone
curl http://localhost:3000/milestones/1

# Get milestones for a specific user
curl http://localhost:3000/milestones/user/1

# Create a new milestone
curl -X POST http://localhost:3000/milestones \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "title": "First Marathon",
    "description": "Completed first full marathon",
    "date": "2024-04-15",
    "type": "running",
    "achieved": false
  }'

# Update a milestone
curl -X PUT http://localhost:3000/milestones/1 \
  -H "Content-Type: application/json" \
  -d '{
    "achieved": true
  }'

# Delete a milestone
curl -X DELETE http://localhost:3000/milestones/1
```

## Deployment

The project is configured for deployment on Render. It consists of two services:

1. Main API Service
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

2. JSON Server Service
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm run json-server`

## Environment Variables

- `PORT`: Port number for the Express API (default: 3000)
- `JSON_SERVER_URL`: URL of the json-server (default: http://localhost:3001)

