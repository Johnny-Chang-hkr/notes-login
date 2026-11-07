# Notely

Notely is a full-stack notes app for capturing and organizing ideas. It includes account registration and login, searchable notes, tags, pinned notes, note colors, sorting, and responsive grid and list views.

## Stack

- **Frontend:** React, Vite, Tailwind CSS
- **API:** Node.js, Express
- **Database:** MongoDB via Mongoose
- **Authentication:** JSON Web Tokens
- **Hosting:** The Express server can serve the built frontend in production, including on Render.

## Local development

### Requirements

- Node.js and npm
- Access to a MongoDB database

### 1. Configure the API

Create `backend/.env` with the connection details for your development database and a private JWT signing secret:

```env
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_long_random_secret
```

Keep `.env` files and real credentials private; do not commit them to GitHub.

### 2. Install dependencies

From the repository root:

```sh
npm install --prefix backend
npm install --prefix frontend/notes-app
```

### 3. Start the development servers

In one terminal, start the API:

```sh
npm run dev --prefix backend
```

In another terminal, start the Vite frontend:

```sh
npm run dev --prefix frontend/notes-app
```

Open the Vite URL printed in the terminal (normally `http://localhost:5173`). In development, the frontend sends API requests to `http://localhost:8000/api`.

## Production and Render

The root `package.json` provides scripts for building the frontend and starting the Express server:

```sh
npm run build
npm start
```

For a Render Web Service using the repository root:

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Environment:** `NODE_ENV=production`

Add these secrets in the Render service's environment settings:

- `MONGODB_URI` — the connection string for the existing hosted MongoDB database.
- `ACCESS_TOKEN_SECRET` — a long, private random value used to sign access tokens.

Render supplies `PORT` to the service; the API uses it automatically. Keep the existing MongoDB database and connection string configured for the deployed service. Ensure the database's network-access rules allow connections from the deployed Render service. Never put production credentials in this README, source code, or a committed `.env` file.

In production, Express serves the built Vite app and API from the same service. The frontend uses relative `/api` requests, so no separate frontend API URL needs to be configured.

## Features

- Create, edit, pin, and delete notes
- Add tags and filter notes by tag
- Search note titles, content, and tags as you type
- Choose a saved note color
- Sort by newest, oldest, or title
- Switch between grid and list layouts
- Responsive workspace and note editor
- Keyboard shortcut: `Ctrl+K` / `Cmd+K` focuses search

## Project layout

```text
backend/
  index.js                 Express server and production static hosting
  src/controllers/         Account and note request handlers
  src/models/              Mongoose models
  src/routes/              API routes
frontend/notes-app/
  src/                     React app, pages, and components
  package.json             Frontend scripts and dependencies
package.json               Root build and start scripts
```

## Checks

Run the frontend lint and production build from `frontend/notes-app`:

```sh
npm run lint
npm run build
```
