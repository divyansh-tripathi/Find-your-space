const Listing = require("../models/listing");

// Index Route
module.exports.index = async (req, res) => {
    try {
        const allListings = await Listing.find({});
        console.log("Fetched Listings Count:", allListings.length);
        res.json(allListings);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// New Route - returns metadata or simple message for API
module.exports.renderNewForm = (req, res) => {
    res.json({ message: "Ready to create a new space" });
};

// Show Route
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    try {
        const listing = await Listing.findById(id)
            .populate("owner")
            .populate({
                path: "feedbacks",
                populate: { path: "author" }
            });
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json(listing);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};

// Create Route
module.exports.createListing = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Only admins can create listings" });
        }
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id; 
        await newListing.save();
        res.status(201).json({ message: "New Listing Created", listing: newListing });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Edit Route Data
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json(listing);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};

// Update Listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    console.log("Updating listing ID:", id);
    console.log("Update Data:", JSON.stringify(req.body.listing, null, 2));
    try {
        const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true, runValidators: true });
        if (!updatedListing) {
            console.log("Update Failed: Listing not found");
            return res.status(404).json({ error: "Listing not found" });
        }
        console.log("Update Success for ID:", id);
        res.json({ message: "Listing Updated", listing: updatedListing });
    } catch (err) {
        console.error("Update Controller Error:", err.message);
        res.status(400).json({ error: err.message });
    }
};

// Destroy Listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    try {
        const deletedListing = await Listing.findByIdAndDelete(id);
        if (!deletedListing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json({ message: "Listing Deleted", listing: deletedListing });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};