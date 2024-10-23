const mongoose = require('mongoose');
const review = require('./review.js');

// Define the image schema
const imageSchema = new mongoose.Schema({
  filename: { 
    type: String, 
    default: "house (1).jpg"  // Default filename
  },
  url: { 
    type: String, 
    default: "/init/images/house (1).jpg"  // Default URL
  }
});

// Define the listing schema
const listingSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  image: { 
    type: imageSchema,  // Use the image schema here
    default: () => ({})  // Provide an empty object by default
  },
  price: { 
    type: Number 
  },
  location: { 
    type: String 
  },
  country: {
    type: String 
  },
  reviews : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Review",
  }
  ],
});


listingSchema.post("findOneAndDelete", async (listing) => {
   if(listing) {
    await review.deleteMany({_id : {$in : listing.reviews}});
   }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
