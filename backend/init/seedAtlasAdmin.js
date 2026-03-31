if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const mongoose = require("mongoose");
const User = require("../models/user");

const MONGO_URL = process.env.MONGO_URL; // Uses your Atlas link from .env

if (!MONGO_URL || MONGO_URL.includes("127.0.0.1")) {
    console.error("Error: Please set your MongoDB Atlas link in backend/.env first!");
    process.exit(1);
}

async function seedAdmin() {
    try {
        console.log("Connecting to Atlas...");
        await mongoose.connect(MONGO_URL);
        
        const username = "admin";
        const email = "admin@findyourspace.com";
        const password = "adminpassword123";

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            existingUser.role = "admin";
            await existingUser.save();
            console.log(`Success: Existing user '${username}' promoted to Admin in Atlas!`);
        } else {
            const newUser = new User({ email, username, role: "admin" });
            await User.register(newUser, password);
            console.log(`Success: New Admin created in Atlas!`);
            console.log(`Username: ${username}`);
            console.log(`Password: ${password}`);
        }
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        mongoose.connection.close();
    }
}

seedAdmin();
