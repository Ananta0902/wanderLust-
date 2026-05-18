const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage});

router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[imageFile]"),
    wrapAsync(listingController.createListing)
  );
   
//Search
router.get("/search",listingController.searchListing);

// New
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/search", async (req, res) => {
    let { q } = req.query;

    if (!q) {
        req.flash("error", "Search text missing");
        return res.redirect("/listings");
    }

    const allListings = await Listing.find({
        location: { $regex: q, $options: "i" }
    });

    res.render("listings/index.ejs", { allListings });
});
// Show
router.get("/:id", wrapAsync(listingController.showListing));

// Edit
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Update
router.put("/:id", isLoggedIn, isOwner,upload.single("listing[imageFile]"), validateListing, wrapAsync(listingController.updateListing));

// Delete
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));
module.exports = router;
