

import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/zoom-db";
        
        if (!MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }
        
        const connectionDb = await mongoose.connect(MONGO_URL);
        console.log(`MongoDB connected successfully: ${connectionDb.connection.host}`);
        
        server.listen(app.get("port"), () => {
            console.log(`Server listening on port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

start();
