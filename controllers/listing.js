const Listing=require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Search logic 
module.exports.searchListing = async (req, res) => {
  const searchQuery = req.query.q; // user’s search text
  // If user didn’t type anything, show all listings
  if (!searchQuery) {
    const allListings = await Listing.find({});
    return res.render("listings/index.ejs", { allListings, searchQuery: "" });
  }
  const allListings = await Listing.find({});
  // convert both search text and listing fields to lowercase
  const filteredListings = allListings.filter(listing => {
    return (
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase())||
      listing.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  // 👉 Add this check (this is the line you asked for)
  if (filteredListings.length === 0) {
    req.flash("error", `No listings found for "${searchQuery}".`);
    return res.redirect("/listings"); // redirect back to main listings page
  }

  res.render("listings/index.ejs", {
    allListings: filteredListings,
    searchQuery,
  });
};



module.exports.index=async (req,res,next) => {
  const allListings = await Listing.find({}).populate("owner");
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm=(req, res) => {
  res.render("listings/new.ejs"); 
};


module.exports.showListing=async (req,res,next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path:"reviews",
      populate:{
        path:"author",
      },
    })
     .populate("owner");
  if(!listing){
    req.flash("error","listing you requested for does not exist");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  if (req.file) {
    // user uploaded a file
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } else if (req.body.listing.imageUrl && req.body.listing.imageUrl.trim() !== "") {
    // user provided a link
    newListing.image = {
      url: req.body.listing.imageUrl,
      filename: "external-link",
    };
  } else {
    req.flash("error", "Please upload an image or provide an image URL.");
    return res.redirect("/listings/new");
  }

  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();
  req.flash("success", "New listing created!!");
  res.redirect("/listings");
};
;

module.exports.renderEditForm=async (req,res,next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","listing you requested does not exist!");
    res.redirect("/listings");
  }
  let originalImageUrl=listing.image.url;
  originalImageUrl.replace("/upload","/upload/w_250")
  res.render("listings/edit.ejs", { listing,originalImageUrl});
};

module.exports.updateListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } 
  else if (
    req.body.listing.imageUrl &&
    req.body.listing.imageUrl.trim() !== ""
  ) {
    listing.image = {
      url: req.body.listing.imageUrl,
      filename: "external-link",
    };
  }
  await listing.save();

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};


module.exports.destroyListing=async (req,res,next) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","Listing deleted!!");
  res.redirect("/listings");
};


