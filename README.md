# 📘 MERN Admin Agent Distributor

## 📝 Description

This is a full-stack MERN application that allows an admin to:

- Log in securely using JWT authentication
- Add, edit, and delete agents
- Upload CSV or Excel files containing lead/task data
- Automatically distribute entries equally among 5 agents
- View assigned entries for each agent via the frontend

---

## ⚙️ Tech Stack

- **Frontend:** React.js (deployed on Vercel)
- **Backend:** Node.js + Express.js (deploy separately, e.g., Render/Railway)
- **Database:** MongoDB
- **Authentication:** JWT
- **File Handling:** multer, csv-parser, xlsx

---

## 📁 Project Structure

```
root/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
├── README.md
```

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sakshambajpai1604/mern-admin-agent-management.git
cd mern-admin-agent-distributor
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/agent-distributor
JWT_SECRET=your_jwt_secret
```

### 3️⃣ Create Admin User (One-Time)

Run this script:

```bash
node scripts/createAdmin.js
```

This creates:

- **Email:** admin@example.com
- **Password:** admin123

### 4️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

**Set API base URL:**  
Edit `frontend/src/api/axios.js` to point to your backend (local or deployed):

```js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // or your deployed backend URL
});

export default API;
```

### 5️⃣ Running the Application Locally

**Start Backend**

```bash
cd backend
npm start
```
If no start script:
```bash
node server.js
```

**Start Frontend** (in another terminal):

```bash
cd frontend
npm start
```

---

## 🌐 Deploying the Application

### Deploy Frontend (React) on Vercel

1. Push your `frontend` folder to GitHub.
2. Go to [vercel.com](https://vercel.com/) and import your repo.
3. Set the **root directory** to `frontend`.
4. Set environment variables if needed (e.g., `REACT_APP_API_URL`).
5. Deploy!

### Deploy Backend (Express) on Render/Railway/Other

1. Push your `backend` folder to GitHub.
2. Import it into your chosen backend host (Render, Railway, etc.).
3. Set environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`).
4. Deploy and note the backend URL.
5. Update your frontend API base URL to point to the deployed backend.

---

## ✅ Test Admin Login

- **Email:** admin@example.com
- **Password:** admin123

---

## 📦 Upload File Format

Supported formats: `.csv`, `.xlsx`, `.xls`

**Headers required:**

```
FirstName, Phone, Notes
```

---

## 🔧 Features

- Admin JWT Login and Register
- Create, Read, Update and Delete agents
- Upload and validate CSV/XLSX files
- Even distribution of entries among agents
- Store and display data per agent
- Responsive UI

---

## 🔮 Future Enhancements

- Agent-specific dashboards
- Status tracking (pending/completed)
- Email notifications
- Analytics and dashboard metrics

---

## 🛠️ Troubleshooting

- If you see "No agents found" on the dashboard, check:
  - The backend is running and accessible
  - The frontend API base URL is correct
  - Agents exist in the database with `role: "agent"`
  - The Authorization token is present in requests

- For deployment, always set the correct API URLs and environment variables.

---
