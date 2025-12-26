mapboxgl.accessToken = mapToken;

// Check that listing has geometry
if(listing.geometry && listing.geometry.coordinates) {
    const coordinates = listing.geometry.coordinates; // [lng, lat]
    const listingLocation = listing.location || "No location provided";

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates,
        zoom: 9
    });

    const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat(coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>${listingLocation}</h4> <p>Exact location provided after booking!</p>`)
        )
        .addTo(map);
} else {
    console.log("Listing coordinates not found");
}


