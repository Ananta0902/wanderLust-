     mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, //[longitute,latitude]
        zoom: 9 // starting zoom
    });

// Set marker options.
const marker = new mapboxgl.Marker({color:"red"})
   .setLngLat(coordinates)        //Listing.geometry coordinates
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${listingLocation}</h4> <p>Exact location provided after booking!</p>`))
    .addTo(map);

