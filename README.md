# ❤️ HeartLink

HeartLink is a private couple-focused web application designed to help partners stay connected through real-time communication, location sharing, and shared personal features.

The project is currently under active development.

## ✨ Features

### 👤 User Authentication
- User registration
- User login
- Password hashing
- JWT-based authentication
- Unique partner code generation

### 💑 Partner Connection
- Generate a unique partner code
- Connect two accounts using partner codes
- Private couple-to-couple connection

### 💬 Real-Time Chat
- Real-time messaging using Socket.IO
- Online/offline status
- Typing indicators
- Message status
- Private conversations

### 📍 Location Sharing
- Share live location with your partner
- Real-time location updates using Socket.IO
- Partner location display on a map

### ❤️ Couple Dashboard
- Partner information
- Connection status
- Online/offline indicator
- Location information
- Couple-specific features

### 📸 Memories
Planned features include:
- Shared photos
- Special dates
- Notes
- Relationship timeline

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- Socket.IO

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Token (JWT)
- bcrypt
- dotenv
- CORS

### Development Tools
- Visual Studio Code
- Git
- GitHub

---

## 📁 Project Structure

```text
heartlink/
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   └── User.js
│
├── public/
│   ├── dashboard.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── script.js
│   └── style.css
│
├── routes/
│   └── auth.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
