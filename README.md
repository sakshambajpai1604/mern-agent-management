# 📘 MERN Admin Agent Distributor

## 📝 Description

This is a full-stack MERN application that allows an admin to:

- Log in securely using JWT authentication
- Add and manage agents
- Upload CSV or Excel files containing lead/task data
- Automatically distribute entries equally among 5 agents
- View assigned entries for each agent via the frontend

---

## ⚙️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
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
│   │   ├── components/
│   │   └── pages/
├── README.md
```

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mern-admin-agent-distributor.git
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

Ensure API calls point to: `http://localhost:5000`

### 5️⃣ Running the Application

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

- Admin JWT Login
- Add agents
- Upload and validate CSV/XLSX files
- Even distribution of entries among agents
- Store and display data per agent

---

## 🔮 Future Enhancements

- Agent-specific dashboards
- Status tracking (pending/completed)
- Email notifications
- Analytics and dashboard metrics
