const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

module.exports.isLoggedIn = async (req, res, next) => {
    if (req.isAuthenticated()) return next();

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.SECRET || "mysupersecretcode");
            const user = await User.findById(decoded.id);
            if (user) {
                req.user = user;
                return next();
            }
        } catch (err) {
            return res.status(401).json({ error: "Session expired. Please login again." });
        }
    }

    return res.status(401).json({ error: "You must be logged in to perform this action" });
};

module.exports.checkToken = async (req, res, next) => {
    if (req.isAuthenticated()) return next();
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.SECRET || "mysupersecretcode");
            const user = await User.findById(decoded.id);
            if (user) req.user = user;
        } catch (err) { }
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) res.locals.redirectUrl = req.session.redirectUrl;
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    try {
        let listing = await Listing.findById(id);
        if (!listing) return res.status(404).json({ error: "Listing not found" });
        if (req.user.role === "admin") return next();
        if (!listing.owner.equals(req.user._id)) {
            return res.status(403).json({ error: "You do not have permission to modify this listing" });
        }
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};

module.exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") return next();
    res.status(403).json({ error: "Access denied. Admin privileges required." });
};
