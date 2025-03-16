import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userController from "./controllers/userController.js";
import serviceController from "./controllers/serviceController.js";
import bookingController from "./controllers/bookingController.js";
import articleController from "./controllers/articleController.js";

import authMiddleware from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/api/auth/register", userController.register);
app.post("/api/auth/login", userController.login);
app.post("/api/auth/logout", authMiddleware, userController.logout);
app.get("/api/users/profile", authMiddleware, userController.getProfile);
app.get("/api/admin/users", authMiddleware, userController.getAllUsers);
app.put("/api/admin/users/role", authMiddleware, userController.changeRole);

app.get("/api/services", serviceController.getAllServices);
app.get("/api/services/filter", serviceController.filterServices);
app.get("/api/services/:id", serviceController.getServiceById);
app.post("/api/services", authMiddleware, serviceController.createService);
app.put("/api/services/:id", authMiddleware, serviceController.updateService);
app.delete("/api/services/:id", authMiddleware, serviceController.deleteService);
app.post("/api/services/:id/like", authMiddleware, serviceController.likeService);
app.post("/api/services/:id/dislike", authMiddleware, serviceController.dislikeService);

app.post("/api/bookings", authMiddleware, bookingController.createBooking);
app.get("/api/admin/bookings", authMiddleware, bookingController.getPendingBookings);
app.put("/api/bookings/:id/status", authMiddleware, bookingController.updateBookingStatus);
app.delete("/api/bookings/:id", authMiddleware, bookingController.deleteUserBooking);
app.delete("/api/admin/bookings/:id", authMiddleware, bookingController.deleteBooking);

app.post("/api/articles", authMiddleware, articleController.createArticle);
app.get("/api/articles", articleController.getAllArticles);
app.get("/api/articles/:id", articleController.getArticleById);
app.put("/api/articles/:id", authMiddleware, articleController.updateArticle);
app.delete("/api/articles/:id", authMiddleware, articleController.deleteArticle);

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
