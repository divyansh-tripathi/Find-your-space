const Feedback = require("../models/feedback");
const Listing = require("../models/listing");

module.exports.createFeedback = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
    }

    let newFeedback = new Feedback(req.body.feedback);
    newFeedback.author = req.user._id;
    newFeedback.listing = id;

    await newFeedback.save();
    res.status(201).json({ message: "Feedback added!", feedback: newFeedback });
};

module.exports.destroyFeedback = async (req, res) => {
    let { feedbackId } = req.params;
    await Feedback.findByIdAndDelete(feedbackId);
    res.json({ message: "Feedback deleted" });
};
