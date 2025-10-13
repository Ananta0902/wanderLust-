const Listing=require("../modules/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async (req, res) => {
  const allListings = await Listing.find({}); 
  res.render("listing/index.ejs", { allListings });
};

module.exports.renderNewForm= (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.showListing=async (req, res) => {
  const { id } = req.params;
  const foundListing = await Listing.findById(id)
  .populate({
    path:"reviews",
    populate:{           //har review ke sath uska author nested form me populate
      path:"author",
    },
  })
  .populate("owner");
  if (!foundListing) {
    req.flash("error", "The listing you requested does not exist");
    return res.redirect("/listings");
  }
  res.render("listing/show.ejs", { Listing: foundListing });
};

module.exports.createListing=async (req, res) => {
let response=await geocodingClient.forwardGeocode({
  query:req.body.listing.location,
  limit: 1,
})
  .send();
  let url=req.file.path;
  let filename=req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image={url,filename};
  newListing.geometry=response.body.features[0].geometry;
  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect(`/listings`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "The listing you requested does not exist");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listing/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file!=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
  };

module.exports.destroyListing=async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};


