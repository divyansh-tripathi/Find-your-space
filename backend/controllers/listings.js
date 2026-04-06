const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json(allListings);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.renderNewForm = (req, res) => {
    res.json({ message: "Ready to create a new space" });
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    try {
        const listing = await Listing.findById(id)
            .populate("owner")
            .populate({ path: "feedbacks", populate: { path: "author" } });
        if (!listing) return res.status(404).json({ error: "Listing not found" });
        res.json(listing);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};

module.exports.createListing = async (req, res, next) => {
    try {
        if (req.user.role !== "admin" && req.user.role !== "manager") {
            return res.status(403).json({ error: "Only admins or managers can create listings" });
        }
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        await newListing.save();
        res.status(201).json({ message: "New Listing Created", listing: newListing });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).json({ error: "Listing not found" });
        res.json(listing);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    try {
        const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true, runValidators: true });
        if (!updatedListing) return res.status(404).json({ error: "Listing not found" });
        res.json({ message: "Listing Updated", listing: updatedListing });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    try {
        const deletedListing = await Listing.findByIdAndDelete(id);
        if (!deletedListing) return res.status(404).json({ error: "Listing not found" });
        res.json({ message: "Listing Deleted", listing: deletedListing });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};