const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const userController = require("../controllers/users.js");

// Signup
router.post("/signup", wrapAsync(userController.signup));

// Login
router.post("/login", 
    passport.authenticate("local", { failWithError: true }),
    userController.login,
    (err, req, res, next) => {
        res.status(401).json({ error: "Invalid username or password" });
    }
);

// Logout
router.get("/logout", userController.logout);

// Current User
router.get("/currUser", checkToken, userController.getCurrUser);

// --- ADMIN ROUTES ---
const { isAdmin, isLoggedIn } = require("../middleware.js");

router.get("/users", isLoggedIn, isAdmin, wrapAsync(userController.index));
router.put("/users/:id/role", isLoggedIn, isAdmin, wrapAsync(userController.updateRole));
router.delete("/users/:id", isLoggedIn, isAdmin, wrapAsync(userController.destroyUser));

module.exports = router;
