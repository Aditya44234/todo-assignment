 
# Todo App Assignment (MERN + Vite + Zustand + Tailwind)

A full-stack todo application using:
- **Frontend:** React (Vite), Zustand (auth), React Query, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Zod validation, TypeScript

##  Live Demo

- **Frontend:** [https://todo-assignment-brown.vercel.app/](https://todo-assignment-brown.vercel.app/)
- **Backend:** [https://todo-assignment-p8uv.onrender.com](https://todo-assignment-p8uv.onrender.com)


---

## 🗂️ Monorepo Structure

```
ToDo-app/
│
├── client/ # Frontend code (Vite + React)
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── ...
│
├── server/ # Backend code (Express + MongoDB)
│ ├── src/
│ ├── package.json
│ └── ...
│
└── README.md 

```


---

## 🖥️ Local Development

###  Clone and Install

```
git clone <your-repo-url>
cd project-root
```
Install frontend dependencies

```
cd client
npm install

```

Install backend dependencies

```
cd ../server
npm install
```



### 2️⃣ Environment Variables

#### Backend (`server/.env`)

```

MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=5000

```


#### Frontend (`client/.env`)

```
VITE_API_URL=https://<your-backend-url>
```



### 3️⃣ Run Locally

- **Backend:**


```
cd server
npm run dev

```
or, for production build:
```
npm run build
npm start
```


- **Frontend:**
```
cd client
npm run dev
```



---

## Deployment

### Frontend

- Deploy the `client/` directory on [Vercel](https://vercel.com/) (or Netlify).  
- Make sure to set the `VITE_API_URL` environment variable to your backend’s public URL.

### Backend

- Deploy the `server/` directory on [Render](https://render.com/), Railway, or any Node host.
- Ensure MongoDB is provisioned and its URI is set as `MONGODB_URI`.

---

## 📝 Features

- User registration, login, JWT authentication
- Per-user todo CRUD (Create, Read, Update, Delete)
- Protected API and frontend routes
- Modern, mobile-friendly UI (Tailwind)
- Instant UX (React Query, Zustand)
- TypeScript and zod validation throughout
- CORS configured for frontend/backend separation

---

## 🔗 API Endpoints

- `POST /auth/signup` — Register new user
- `POST /auth/login` — Authenticate & receive JWT
- `GET /todos` — Get all todos (auth required)
- `POST /todos` — Add todo (auth required)
- `PATCH /todos/:id` — Update todo (auth required)
- `DELETE /todos/:id` — Delete todo (auth required)

---

## 📦 Scripts

#### Frontend
- `npm run dev` — Start frontend dev server
- `npm run build` — Build for production

#### Backend
- `npm run dev` — Run with nodemon/ts-node for development
- `npm run build` — Compile TypeScript
- `npm start` — Run built server in production

---

## Credits & Acknowledgements

- [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)

---

## 📝 License

MIT

---

**Feel free to submit PRs or issues! Developed by Aditya**
