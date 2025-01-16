
// Define the Cart Schema

const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
 //   userId: { 
  //      type: mongoose.Schema.Types.ObjectId, 
  //      ref: 'app', // Reference to the User model
   //     required: true 
  //  },
    items: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', // Reference to a Product model (optional, for better normalization)
                required: true 
            },
            name: { 
                type: String, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            },
            quantity: { 
                type: Number, 
                default: 1 
            }
        }
    ]
}, { timestamps: true });

// Create the Cart Model
const Cart = mongoose.model('Cartss', cartSchema);

module.exports = Cart;
