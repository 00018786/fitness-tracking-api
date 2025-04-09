# Fitness Tracking API

A RESTful API for tracking fitness milestones, built with Node.js, Express, and TypeScript. The project uses json-server as a mock database.

## Features

- Create, read, update, and delete fitness milestones
- Create and delete users
- Track user achievements
- RESTful API endpoints
- TypeScript support
- Mock database with json-server

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

## API Endpoints

### Users

- `POST /users` - Create a new user
- `DELETE /users/:id` - Delete a user

Example user object:
```json
{
  "id": 1,
  "name": "John Doe"
}
```

### Milestones

- `GET /milestones` - Get all milestones
- `GET /milestones/:id` - Get a specific milestone
- `GET /milestones/user/:userId` - Get all milestones for a specific user
- `POST /milestones` - Create a new milestone
- `PUT /milestones/:id` - Update a milestone
- `DELETE /milestones/:id` - Delete a milestone

Example milestone object:
```json
{
  "id": 1,
  "userId": 1,
  "title": "First 5K Run",
  "description": "Completed first 5K run without stopping",
  "date": "2024-04-01",
  "type": "running",
  "achieved": true
}
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.