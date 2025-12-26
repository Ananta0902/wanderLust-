const Listing = require("./models/listing.js"); 
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema} = require("./schema.js");
const {reviewSchema}=require("./schema.js");

// Check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // Save the URL they were trying to access
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You need to log in first!");
    return res.redirect("/login");
  }
  next();
};

// Save redirect URL to locals (optional, for templates)
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// Check if current user is owner of the listing
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const foundListing = await Listing.findById(id);
  if (!foundListing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  if (!foundListing.owner.equals(req.user._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//validateListing middleware
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    console.log("Validation failed:", error.details.map(el => el.message));
    throw new ExpressError(404, error.details.map(el => el.message).join(","));
  }
  console.log("Validation passed");
  next();
};

//validateReview middleware
module.exports.validateReview=(req,res,next)=>{
   let {error}=reviewSchema.validate(req.body);
  if(error){
    throw new ExpressError(404,resourceLimits.error);
  }
  else{
    next();
  }
};

// Check who is the author of this review
module.exports.isReviewAuthor = async (req, res, next) => {
  const {id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};