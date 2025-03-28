# 🚀 Cleanly

## 📜 Project Description

**Cleanly** is a **single-page application (SPA)** built with **React**, **Node.js**, **Express.js**, and **MongoDB**, designed for a cleaning service company. The platform allows users to book cleaning appointments, view available services, and manage their profiles. **Admins** have full control over services, bookings, and user roles. Only authenticated users can add blog articles, and the app provides a user-friendly interface with role-based access control.

This project is powered by the **MERN stack**:
- **Front-end:** React  
- **Back-end:** Node.js with Express.js  
- **Database:** MongoDB  
- **Styling:** Tailwind CSS  

---

## ⚙️ Features

### 🔓 Public Pages

- **Home** – Overview of the app with highlighted features and available services.  
- **Catalog** – Browse all available cleaning services, with filtering and sorting options.  
- **Login/Register** – Users can create accounts and log in to access additional features.  
- **About** – Learn more about the purpose and functionalities of the app.  
- **Blog** – View cleaning-related articles (only **authenticated users** can create and manage articles).  

### 🔐 Private Pages (Registered Users)

- **Profile Management** – Users can view their reservation history (approved and declined).  
- **Make Reservations** – Users can book cleaning services and manage their appointments.  
- **Blog Management** – Authenticated users can add, edit, and delete their own articles.  

### 🔑 Admin-Only Features

- **Add/Manage Services** – Only **admins** can create, edit, or delete cleaning services.  
- **Approve/Decline Reservations** – Admins can view and manage user bookings.  
- **Manage Users** – Admins can view all users and change their roles (from user to admin or vice versa).  
- **Manage Blog** – Admins can approve, edit, or delete blog articles.

- ## Go and see it - https://lyubomir08.github.io/Cleanly/

## 🚀 Installation and Setup

### **Set up environment variables**:

1. In the `server` folder, create a `.env` file with the following variables:
     ```bash
     PORT=5000
     MONGODB_URI=<Your-MongoDB-Connection-String>
     JWT_SECRET=<Your-Secret-Key>
     ```

2. Replace `<Your-MongoDB-Connection-String>` with your MongoDB connection string (e.g., from MongoDB Atlas or your local MongoDB instance).  
3. Replace `<Your-Secret-Key>` with a strong secret key for JWT authentication.

### **Install dependencies**

- In both server and client folder type "npm i".

### Steps

1. **Clone the repository**:
   Github URL
   ```bash
   https://github.com/lyubomir08/Cleanly
3. **Start the client**:
   ```bash
   cd .\client\
   and type "npm run dev"
4. **Start the server**:
   - open new terminal and type:
   ```bash
   cd .\server\
   and type "npm start"
