# URL Shortener

## Overview

The URL Shortener is a web application that allows users to convert long URLs into shorter, more manageable links. It also provides analytics to track the usage of these shortened links. The project comprises a **backend** built with Node.js, Express, and Prisma, and a **frontend** developed using Vue 3 and Pinia.

## Features

- **URL Shortening:** Convert lengthy URLs into concise links.
- **Redirection:** Navigate users to the original URL when they access the short link.
- **Analytics:** Monitor click counts and other relevant statistics for each shortened URL.
- **User Authentication:** Manage user accounts securely.
- **API Access:** Interact programmatically with the URL shortening service.

## Tech Stack

### Backend

- **Node.js** with **Express.js**: Server-side logic and API handling.
- **Prisma ORM**: Database modeling and querying.
- **PostgreSQL**: Primary database system.
- **JWT**: Secure user authentication.
- **Nodemailer**: Email services for user verification.

### Frontend

- **Vue 3**: Reactive user interface development.
- **Pinia**: State management for Vue applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Installation

### Prerequisites

- **Node.js** and **npm**: Ensure they are installed on your system.
- **PostgreSQL**: Set up a PostgreSQL database.

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/khuongminhhuy1/url-shortener.git
   cd url-shortener
2. **Backend setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Update with your database credentials
   npx prisma migrate dev  # Apply database migrations
   npm run dev  # Launch the backend server
3. **Frontend setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev  # Launch the frontend application
## Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`feature-new-functionality`)
3. Commit your changes
4. Push to your fork and open a Pull Request

## Contact
📧 Email: khuongminhhuy1505@gmail.com
🔗 GitHub: [khuongminhhuy1](https://github.com/khuongminhhuy1)
🔗 LinkedIn: [Khương Minh Huy](https://www.linkedin.com/in/khuong-minh-huy/)

## License
This project is licensed under the MIT License.
