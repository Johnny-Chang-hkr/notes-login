# Notely

Notely is a responsive notes workspace built with React, Vite, Express, and MongoDB. It supports account sign-in, note creation and editing, tags, pinning, live search, sorting, grid/list layouts, saved note colors, and a focused reading view for opening notes.

## Run locally

1. Configure `backend/.env` with `MONGODB_URI` and `ACCESS_TOKEN_SECRET`.
2. Install and start the API:

   ```sh
   npm install --prefix backend
   npm run dev --prefix backend
   ```

3. In another terminal, install and start the frontend:

   ```sh
   npm install --prefix frontend/notes-app
   npm run dev --prefix frontend/notes-app
   ```

The Vite development server runs at `http://localhost:5173` and the API defaults to `http://localhost:8000`.

## Frontend checks

Run these commands from `frontend/notes-app`:

```sh
npm run lint
npm run build
```
