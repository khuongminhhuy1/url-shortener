# URL Shortener

## 🚀 Introduction

This is a **URL Shortener** application built with **Vue 3 (Pinia, Vue Router, Tailwind CSS)** on the frontend and **Node.js (Express, Prisma, PostgreSQL)** on the backend. The application allows users to shorten URLs, track click statistics, and manage their shortened links.

## 📌 Features

- ✅ **User Authentication** (Login/Register/Logout with JWT)
- 🔗 **Shorten URLs** and generate unique short codes
- 📊 **Track Clicks** for each shortened URL
- 📄 **User Dashboard** to manage their URLs
- 🔒 **Secure** with authentication and proper validation
- 🛠 **REST API** with full CRUD functionality
- 📡 **Email Verification** and **Password Reset**

---

## 🏗️ Tech Stack

### Frontend (Vue 3 + Vite)
- **Vue 3** (Composition API, Pinia)
- **Vue Router** for navigation
- **Tailwind CSS** for styling
- **Vue Toastification** for notifications
- **Axios** for API calls

### Backend (Node.js + Express)
- **Express.js** for server-side logic
- **Prisma ORM** for database management
- **mySQL** as the database
- **Nodemailer** for email verification and password reset
- **JSON Web Tokens (JWT)** for authentication
- **Cookie-based authentication** (httpOnly, secure cookies)

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```sh
$ git clone https://github.com/khuongminhhuy1/url-shortener.git
$ cd url-shortener
```

### 2️⃣ Backend Setup

```sh
$ cd backend
$ cp .env.example .env # Configure environment variables
$ npm install
$ npx prisma migrate dev # Run database migrations
$ npm run dev
```

### 3️⃣ Frontend Setup

```sh
$ cd frontend
$ cp .env.example .env # Configure frontend environment variables
$ npm install
$ npm run dev
```


## 🔥 API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/auth/logout` | Logout user |
| `POST` | `/api/url/shorten` | Shorten a URL |
| `GET` | `/api/url/:shortCode` | Redirect to the original URL |
| `GET` | `/api/url/stats/:shortCode` | Get URL click statistics |
| `DELETE` | `/api/url/:id` | Delete a short URL |

---

## 🎯 Future Enhancements

- ✅ **QR Code Generation** for shortened URLs
- ✅ **Custom Short URLs** (User-defined aliases)
- ✅ **Analytics Dashboard** for tracking performance

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙌 Contributions

Contributions are welcome! Feel free to **fork**, **star**, and submit a PR. 🚀

---

## 📬 Contact

📧 Email: khuongminhhuy1505@gmail.com
🔗 GitHub: [khuongminhhuy1](https://github.com/khuongminhhuy1)
🔗 LinkedIn: [Khương Minh Huy](https://www.linkedin.com/in/khuong-minh-huy/)

