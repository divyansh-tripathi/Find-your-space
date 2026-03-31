const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Signup
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            const token = jwt.sign({ id: registeredUser._id }, process.env.SECRET || "mysupersecretcode", { expiresIn: "7d" });
            res.status(201).json({ message: "Welcome to FindYourSpace!", user: registeredUser, token });
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login
module.exports.login = async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.SECRET || "mysupersecretcode", { expiresIn: "7d" });
    res.json({ message: "Welcome back!", user: req.user, token });
};

// Logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ message: "You are logged out!" });
    });
};

// CurrUser status
module.exports.getCurrUser = (req, res) => {
    console.log("Backend Req User:", req.user);
    res.json({ user: req.user || null });
};

// --- ADMIN METHODS ---

// List all users
module.exports.index = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

// Update User Role
module.exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    res.json({ message: `User role updated to ${role}`, user });
};

// Delete User
module.exports.destroyUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
};