const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

router.get("/", wrapAsync(listingController.index));
router.get("/new", isLoggedIn, listingController.renderNewForm);
router.get("/:id", wrapAsync(listingController.showListing));
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
router.put("/:id", isLoggedIn, isOwner, wrapAsync(listingController.updateListing));
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;