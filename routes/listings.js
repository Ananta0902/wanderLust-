const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const { isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

router
.route("/")
.get( wrapAsync(listingController.index)) // INDEX Route - shows all listings
.post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing),
);
// isLoggedIn-----> CREATE Route - add new listing

// NEW Route - form for creating a new listing
router.get("/new", isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get(listingController.showListing)       // SHOW Route - show details of a listing
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  listingController.updateListing
)
.delete(isLoggedIn, isOwner,listingController.destroyListing);  // DELETE Route

// EDIT Route - edit listing form
router.get("/:id/edit", isLoggedIn,isOwner,listingController.renderEditForm);

module.exports = router;
