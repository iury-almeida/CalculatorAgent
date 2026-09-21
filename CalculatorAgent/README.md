# Calculator Agent

A web-based calculator with a Vue 3 frontend and Node.js/Express backend.

## Architecture

- **Frontend**: Vue 3 + Vite (port 5173)
- **Backend**: Node.js + Express (port 3001)
- **API**: REST endpoint at `/api/calculate`

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

```bash
# Install all dependencies (server + client)
npm run install:all
```

Or manually:
```bash
# Backend
cd server && npm install

# Frontend
cd client && npm install
```

## Development

Run both frontend and backend concurrently:

```bash
npm run dev
```

This starts:
- Backend server at http://localhost:3001
- Frontend dev server at http://localhost:5173

### Individual commands

```bash
# Backend only
npm run dev:server

# Frontend only
npm run dev:client
```

## Production Build

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## Testing

```bash
# Run all tests
npm test

# Backend tests only
npm run test:server

# Frontend tests only
npm run test:client
```

## API Endpoints

### Health Check
```
GET /health
```
Response:
```json
{
  "status": "ok",
  "timestamp": "2026-09-21T20:35:10.561Z"
}
```

### Calculate
```
POST /api/calculate
Content-Type: application/json

{
  "a": 10,
  "b": 5,
  "operator": "+"
}
```

Supported operators: `+`, `-`, `*`, `/`

Response:
```json
{
  "result": 15
}
```

Error responses (400):
```json
{
  "error": "Division by zero is not allowed"
}
```

## Project Structure

```
calculator-agent/
├── package.json           # Root package with dev scripts
├── server/                # Backend
│   ├── package.json
│   ├── index.js           # Express server
│   ├── calculator.js      # Calculation logic
│   ├── calculator.test.js
│   └── index.test.js
└── client/                # Frontend
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.js
        ├── App.vue
        └── components/
            ├── Calculator.vue
            └── Calculator.test.js
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3001 | Backend server port |

## License

MIT