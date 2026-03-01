# Minsta 📸  
A Full-Stack Social Media Application

Minsta is a full-stack social media web application built using the MERN stack.  
It was developed as part of my backend and frontend learning journey, focusing on real world architecture, authentication, and scalable code structure.

---

## 🚀 Live Deployment

Frontend (Vercel)  
https://minsta-social.vercel.app/

Backend (Railway)  
https://minsta.up.railway.app/

---

## 🧠 Project Overview

Minsta replicates core social media functionality including:

- User Authentication (Register / Login)
- JWT based Secure Sessions
- Create / Read Posts
- Like Posts
- Save Posts
- Follow / Unfollow Users
- Protected Routes
- Context based State Management (Frontend)

The project emphasizes clean architecture, separation of concerns, and scalable backend structure.

---

# 🏗️ Architecture Overview

## Backend Structure (Node.js + Express)

The backend follows a controller based architecture:

- Routes → Define endpoints
- Controllers → Handle business logic
- Models → Define database schemas
- Middleware → Authentication & error handling
- Config → Database connection

### Folder Structure
```
Backend/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── post.controller.js
│   │   └── follow.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── uploadError.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   ├── follow.model.js
│   │   ├── like.model.js
│   │   └── save.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── post.routes.js
│   │   └── follow.routes.js
│   │
│   └── app.js
│
├── server.js
└── .env
```

---

## 🔐 Authentication System

- Passwords are hashed using SHA-256 before storage
- JWT tokens are generated upon login/register
- Tokens are stored in cookies
- Auth middleware verifies token for protected routes
- “Get Me” endpoint returns authenticated user details

Security Improvements Implemented:
- No plain text passwords
- Token expiration
- Middleware based route protection

---

## 📦 Database Design (MongoDB)

Models Used:

- User → Stores user credentials & profile info
- Post → Stores user generated posts
- Follow → Manages follow relationships
- Like → Tracks post likes
- Save → Stores saved posts

This relational structure allows:
- Feed generation
- User interaction tracking
- Scalable expansion

---

# 🎨 Frontend Structure (React + Vite)

Frontend follows a feature based architecture:

```
Frontend/
│
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── context/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   │
│   │   ├── posts/
│   │   │   ├── components/
│   │   │   ├── context/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   │
│   │   └── shared/
│   │       ├── components/
│   │       └── style/
│   │
│   ├── App.jsx
│   ├── app.routes.jsx
│   └── main.jsx
```

---

## 🧠 Frontend Concepts Implemented

- Context API for Auth and Posts
- Custom Hooks (useAuth, usePost)
- Centralized API Layer
- Protected Routing
- Feature based folder structure
- SCSS modular styling

---

# 🔄 Core Functional Flow

## Register
1. User submits credentials
2. Backend hashes password
3. JWT token generated
4. Token stored in cookie

## Login
1. User submits email/password
2. Password hash validated
3. JWT generated
4. Session established

## Post Creation
1. Authenticated user creates post
2. Stored in MongoDB
3. Feed updates via context

## Image Upload Handling
- Integrated ImageKit for handling image uploads
- Images are uploaded to ImageKit instead of storing them locally
- Keeps backend lightweight and scalable

## Follow System
- Users can follow/unfollow others
- Relationship stored in Follow model

## Like & Save
- Likes stored in Like model
- Saved posts stored in Save model

---

# 🛠️ Tech Stack

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- ImageKit (for image uploads & media storage)

Frontend:
- React
- Vite
- Context API
- Custom Hooks
- SCSS

Deployment:
- Railway (Backend)
- Vercel (Frontend)

---

# 📈 Key Learning Outcomes

While building Minsta, I strengthened my understanding of:

- Full-stack architecture
- Secure authentication systems
- REST API design
- Controller based backend structure
- State management using Context API
- Feature based frontend organization
- Deployment workflows
- Production ready folder structure

---

# 🏁 Final Note

Minsta is a learning driven full-stack project built with a strong focus on structure, scalability, and security practices.  
It represents practical implementation of authentication, relational data modeling, and frontend-backend integration.
