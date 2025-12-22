const sampleListings = [
  {
    title: "Beachside Villa in Goa",
    description:
      "Relax in this beautiful beachside villa just steps away from the golden sands of Goa. Perfect for a laid-back tropical getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Goa",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.8278, 15.4989],
    },
  },

  {
    title: "Mountain Cabin in Manali",
    description:
      "Enjoy breathtaking Himalayan views from this cozy wooden cabin nestled in the mountains of Manali.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Manali",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2396],
    },
  },

  {
    title: "Heritage Haveli in Jaipur",
    description:
      "Experience royal Rajasthani culture in this beautifully restored heritage haveli in the Pink City.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602643163983-ed0babc39797?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Jaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124],
    },
  },

  {
    title: "Lake View Stay in Udaipur",
    description:
      "Wake up to stunning lake views in this peaceful stay near Lake Pichola in the City of Lakes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1583248369069-9d91f7f6c8ad?auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Udaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.7125, 24.5854],
    },
  },

  {
    title: "Hilltop Cottage in Mussoorie",
    description:
      "A charming hilltop cottage offering panoramic views of the Doon Valley and cool mountain breezes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587400873586-7c9b0f36a41c?auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Mussoorie",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [78.0644, 30.4598],
    },
  },

  {
    title: "Tea Estate Bungalow in Munnar",
    description:
      "Stay amidst lush tea gardens in this serene colonial-style bungalow in Munnar.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Munnar",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.0595, 10.0889],
    },
  },

  {
    title: "Backwater Villa in Alleppey",
    description:
      "Experience Kerala’s famous backwaters from this peaceful villa with private canoe access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Alleppey",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.3388, 9.4981],
    },
  },

  {
    title: "Luxury Apartment in Mumbai",
    description:
      "Stay in the heart of Mumbai with skyline views and modern comforts in this luxury apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Mumbai",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [72.8777, 19.0760],
    },
  },

  {
    title: "Riverside Camp in Rishikesh",
    description:
      "Unwind by the Ganges in this peaceful riverside camp, perfect for yoga and adventure lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1589779677460-3b97a4c8f44b?auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Rishikesh",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [78.2676, 30.0869],
    },
  },

  {
    title: "Colonial Stay in Shimla",
    description:
      "A cozy colonial-era home offering beautiful views and cool weather in the hills of Shimla.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1621857426350-6d6f24a3316d?auto=format&fit=crop&w=800&q=60",
    },
    price: 1300,
    location: "Shimla",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1734, 31.1048],
    },
  },

  {
    title: "Coffee Plantation Stay in Coorg",
    description:
      "Wake up to the aroma of fresh coffee in this tranquil plantation stay surrounded by nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Coorg",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [75.8069, 12.3375],
    },
  },

  {
    title: "Desert Camp in Jaisalmer",
    description:
      "Experience the magic of the Thar Desert with luxury tents and stunning sunset views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1597040663342-45b6af3d91b1?auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Jaisalmer",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [70.9083, 26.9157],
    },
  },
];

module.exports = { data: sampleListings };
