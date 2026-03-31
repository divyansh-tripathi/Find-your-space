const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "You must be logged in to perform this action" });
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    try {
        let listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        
        // Admins can bypass ownership checks for management
        if (req.user.role === "admin") {
            return next();
        }

        if (!listing.owner.equals(req.user._id)) {
            return res.status(403).json({ error: "You do not have permission to modify this listing" });
        }
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};

module.exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ error: "Access denied. Admin privileges required." });
    }
};
