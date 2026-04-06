if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");
const ExpressError = require("./utils/ExpressError.js");
const { MongoStore } = require("connect-mongo");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/find-your-space";

main().then(() => {
    console.log("Connected to DB:", mongoose.connection.name);
}).catch(console.error);

async function main() {
    await mongoose.connect(MONGO_URL);
}

const corsOptions = {
    origin: ["https://find-your-space-delta.vercel.app", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: { secret: process.env.SECRET || "mysupersecretcode" },
    touchAfter: 24 * 3600,
});

app.use(session({
    store,
    secret: process.env.SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const feedbackRouter = require("./routes/feedback.js");
app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/feedback", feedbackRouter);
app.use("/api", userRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "API Endpoint Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).json({ error: message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
