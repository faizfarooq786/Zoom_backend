# Zoom_backend (Node/Express + Socket.IO + MongoDB)

Backend for the video-calling app. Provides signaling via Socket.IO and REST routes under `/api/v1/*`.

## Run locally
npm install
npm start           # runs node src/app.js
# or npm run dev if you add nodemon

## Env (.env)
PORT=5000
MONGO_URL=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=change-me
CORS_ORIGIN=https://<your-frontend>.onrender.com
# any other keys used by your code (e.g., TURN creds)

## Express hardening (recommended)
- Add `/healthz` route for Render health checks.
- Bind server to 0.0.0.0:
  server.listen(process.env.PORT, '0.0.0.0', ...)

## Deploy (Render Web Service)
- Root Directory: repo root (or `backend` if you split later)
- Build Command: `npm ci`
- Start Command: `npm start`
- package.json:
  "scripts": { "start": "node src/app.js" },
  "engines": { "node": "20.x" }

## Socket.IO / CORS
Configure CORS origins to include your frontend domain and localhost for dev.

## Notes
- `get_all_activity` should be called with JWT (Authorization: Bearer ...) or accept `?username=`/`?userId=` if you want a public read.
