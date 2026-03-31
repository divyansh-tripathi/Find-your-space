const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isAdmin } = require("../middleware.js");
const feedbackController = require("../controllers/feedback.js");

// Post Feedback
router.post("/", isLoggedIn, wrapAsync(feedbackController.createFeedback));

// Delete Feedback (Admin or Author - for now Admin)
router.delete("/:feedbackId", isLoggedIn, isAdmin, wrapAsync(feedbackController.destroyFeedback));

module.exports = router;
