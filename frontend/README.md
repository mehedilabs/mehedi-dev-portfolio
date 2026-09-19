# Full-Stack Developer Portfolio

<p align="center">

<strong>Full-Stack Developer</strong>

</p>

<p align="center">

I build digital products people want to use.

</p>

<p align="center">

<a href="https://mehedi-dev-portfolio.vercel.app">Live Portfolio</a>

•

<a href="https://github.com/mehedilabs/mehedi-dev-portfolio">GitHub Repository</a>

•

<a href="https://www.linkedin.com/in/mehedilabs/">LinkedIn</a>

</p>

---

## 👋 About

This is my personal developer portfolio, built to showcase my skills, projects, experience, education, achievements, and the way I approach building digital products.

The portfolio is designed as a dynamic full-stack application rather than a simple static website.

Portfolio content is managed through a protected Admin Panel and stored in MongoDB, allowing content to be updated without directly editing frontend code.

---

## 🌐 Live Portfolio

**Visit the live portfolio:**

https://mehedi-dev-portfolio.vercel.app

---

## ✨ Features

- Modern dark-themed portfolio interface
- Fully responsive design
- Dynamic portfolio content
- Protected Admin Panel
- Admin authentication
- Profile management
- About section management
- Project management
- Skills management
- Experience management
- Education management
- Achievements management
- Contact message management
- Contact form
- Admin inbox
- Message reply system
- REST API
- MongoDB database
- Mongoose data management
- Form validation
- Admin authorization
- Rate limiting
- Security protections
- Smooth animations
- Toast notifications
- Production deployment with Vercel

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- TypeScript
- React
- Vite
- Tailwind CSS
- Framer Motion
- React Icons
- React Toastify

### Backend

- Node.js
- Express.js
- TypeScript
- REST API
- Mongoose

### Database

- MongoDB
- MongoDB Atlas

### Authentication & Security

- Admin authentication
- Protected routes
- Session-based authentication
- Request validation
- Rate limiting
- CORS configuration
- Environment variables
- Server-side security checks

### Tools

- Git
- GitHub
- VS Code
- Vercel

---

## 🏗️ Project Architecture

The project is organized into separate frontend and backend applications.

```text
mehedi-dev-portfolio/

│

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   │   └── admin/

│   │   ├── config/

│   │   └── ...

│   ├── public/

│   └── package.json

│

├── backend/

│   ├── src/

│   │   ├── controllers/

│   │   ├── models/

│   │   ├── routes/

│   │   ├── middleware/

│   │   └── ...

│   └── package.json

│

├── banner/

│   └── mehedilabs.jpg

│

├── .gitignore

└── README.md
```

## ⚙️ Backend

The backend handles:

- REST API
- MongoDB communication
- Authentication
- CRUD operations
- Contact messages
- Admin authorization
- Validation
- Security
- Rate limiting

The frontend communicates with the backend through API endpoints.

---

## 🗄️ Database

Portfolio content is stored in **MongoDB** and managed through **Mongoose**.

The database stores dynamic portfolio information such as:

- Profile
- About
- Projects
- Skills
- Experience
- Education
- Achievements
- Contact messages

This allows portfolio content to be managed directly from the Admin Panel.

---

## 🔐 Admin Dashboard

The portfolio includes a protected Admin Panel for managing portfolio content.

From the dashboard, portfolio information can be managed dynamically, including:

- Profile
- About
- Projects
- Skills
- Experience
- Education
- Achievements
- Contact messages

The Admin Panel uses protected routes and authentication checks to prevent unauthorized access.

---

## 📬 Contact System

The portfolio includes a working contact system.

Visitors can submit messages through the Contact section, and those messages can be managed from the Admin Panel.

The admin can:

- View messages
- Read message details
- Manage inbox messages
- Reply to messages

## 📁 Content Management

Instead of hardcoding every portfolio item directly into the frontend, the project uses the backend API and MongoDB for dynamic content.

This makes it possible to add or update portfolio content directly from the Admin Panel.

- Projects
- Skills
- Experience
- Education
- Achievements
- Profile
- About

---

## 📱 Responsive Design

The portfolio is designed to work across:

- Mobile devices
- Tablets
- Laptops
- Desktop screens

The interface uses responsive Tailwind CSS utilities and flexible layouts to maintain a consistent experience across different screen sizes.

---

## 🎨 Design Direction

The visual direction of this portfolio focuses on:

- Minimal dark interface
- Cyan/teal accent colors
- Clean typography
- Subtle borders
- Soft background glows
- Smooth animations
- Clear content hierarchy
- Responsive layouts

The goal is to keep the interface modern, clean, and easy to navigate without making it visually overwhelming.

---

## 🚀 Getting Started

If you want to explore or run this project locally, follow the steps below.

### 1. Clone the Repository

```bash
git clone https://github.com/mehedilabs/mehedi-dev-portfolio.git

cd mehedi-dev-portfolio
```

### 2. Install Frontend Dependencies

```bash
cd frontend

npm install
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend

npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

Add your own environment variables for:

- MongoDB connection
- Authentication/session configuration
- CORS configuration
- Other server-side secrets

Never commit `.env` files or private credentials to GitHub.

### 5. Run the Backend

Inside the backend directory:

```bash
npm run dev
```

The backend runs locally on:

http://localhost:5000

### 6. Run the Frontend

Inside the frontend directory:

```bash
npm run dev
```

Vite will provide the local development URL.

---

## 🌍 Deployment

The portfolio is deployed using Vercel.

### Frontend

Live Portfolio:

https://mehedi-dev-portfolio.vercel.app

### Backend

The backend is deployed separately and connected to the frontend through the production API configuration.

MongoDB Atlas is used as the production database.

---

## 🔒 Security

Sensitive credentials and private environment variables are not included in the repository.

The following information should always remain private:

- MongoDB credentials
- Admin credentials
- Session secrets
- API keys
- Environment variables
- Private server-side configuration

Anyone can clone the public repository to explore the source code and run their own local copy.

Cloning the repository does not provide access to the production database, admin credentials, or private environment secrets.

---

## 📚 Learning Journey

This portfolio represents my progress while learning and applying modern web development technologies.

My learning path includes:

HTML

↓

CSS

↓

Tailwind CSS

↓

JavaScript

↓

TypeScript

↓

React

↓

Next.js

↓

Node.js

↓

Express.js

↓

MongoDB

↓

Mongoose

↓

Authentication

↓

Git & GitHub

↓

AI-Assisted Coding

↓

AI Mindset & Engineering

This portfolio was built primarily with React, TypeScript, Node.js, Express.js, MongoDB, and Mongoose.

Next.js is part of my learning roadmap and is being studied separately.

---

## 🎯 Goals

My goal is to become a professional Full-Stack Developer capable of building complete, reliable, and user-focused web applications.

I am continuously working on improving:

- Frontend development
- Backend development
- Database design
- API development
- Authentication
- Security
- Clean code
- Problem solving
- Software architecture
- AI-assisted development

---

## 💡 Development Philosophy

I believe good software should be:

- Useful
- Simple
- Maintainable
- Responsive
- Secure
- Easy to understand
- Focused on the user

I try to build projects that are not only visually appealing but also structured to work as real applications.

---

## 📌 Project Status

This portfolio is actively evolving.

The core portfolio, Admin Panel, backend API, database integration, authentication, contact system, and deployment are already implemented.

More improvements and features may be added as I continue learning and building.

---

## 📬 Contact

Mehedi Hasan

Full-Stack Developer

Email: [mehedi.hasan.bd.dev@gmail.com](mailto:mehedi.hasan.bd.dev@gmail.com)

LinkedIn: https://www.linkedin.com/in/mehedilabs/

GitHub: https://github.com/mehedilabs

Portfolio: https://mehedi-dev-portfolio.vercel.app

---

## ⭐ Support

If you find this project interesting, feel free to explore the repository and learn from the implementation.

You can also visit the live portfolio to see the project in action.

<p align="center">

Built with React, TypeScript, Node.js, Express.js & MongoDB

</p>

<p align="center">

© Mehedi Hasan

</p>
