if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");
const ExpressError = require("./utils/ExpressError.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/find-your-space";

// Database Connection
main().then(() => {
    console.log("Connected to DB:", mongoose.connection.name);
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

// Middlewares
const corsOptions = {
    origin: ["https://find-your-space.vercel.app", "http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:5175"],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Essential for REST API

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    if (Object.keys(req.body).length > 0) {
        console.log("Body:", JSON.stringify(req.body, null, 2));
    }
    next();
});

// Session configuration
const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// API Routes
const feedbackRouter = require("./routes/feedback.js");
app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/feedback", feedbackRouter);
app.use("/api", userRouter);

// 404 Route
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "API Endpoint Not Found!"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).json({ error: message });
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
