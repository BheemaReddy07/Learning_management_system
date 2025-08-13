# 🎓 On-Go Learn - Learning Management System (LMS)

A full-stack Learning Management System built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), designed for **Users** and **Admins**.  
Integrated with **Cloudinary** for media storage and **Email OTP verification** for authentication.  
Users can enroll in courses, complete lessons, and receive updates via email. Admins can create and manage courses and lectures.

---

## ✨ Features

### 👤 User
- 🔐 Login/Register & Reset password with **Email OTP verification**  
- 📚 Browse and enroll in any course  
- ✅ Complete courses and track progress  
- 📩 Receive course updates via email  
- 🔍 Filter courses by **Branch** (CSE, ECE, EEE, etc.) and **Semester** (E1 Sem 1, E2 Sem 1, etc.)  

### 🛠️ Admin
- ➕ Create new courses with title, description, and branch/semester categorization  
- 🎥 Create lectures and upload video lessons (**Cloudinary integration**)  
- 📢 Publish or Unpublish courses  
- ❌ Delete courses  
- ✏️ Edit course details  

---

## 🧰 Tech Stack

| Layer     | Technology                           |
|-----------|--------------------------------------|
| Frontend  | React.js, shadcn/ui, CSS             |
| Backend   | Node.js, Express.js                  |
| Database  | MongoDB with Mongoose                |
| Auth      | JSON Web Tokens (JWT) + Email OTP    |
| Media     | Cloudinary                           |
| Email     | Nodemailer                           |

---

## 👑 Default Admin Credentials

- **Email:** `ongolearn2025@gmail.com`  
- **Password:** `qwerty1234`  

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` folder:

- JWT_SECRET="your-jwt-secret"
- MONGO_URL="your-mongodb-url"  
- USER_EMAIL="your-email-address"
- USER_APPCODE="your-email-app-password"
- CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
- CLOUDINARY_API_KEY="your-cloudinary-api-key"
- CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
- FRONTENDURL="http://localhost:5173/"

## 🧑‍💻 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/BheemaReddy07/Learning_Management_System.git
cd Learning_Management_System
```
### 2. Install server Dependencies
```bash
cd server
npm install
```
### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```
 

### 5. Run the Project
```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```
---
 

## Contact
Bheemareddy
- email:bheemareddy2910@gmail.com

🌟 If you like this project, give it a star!



