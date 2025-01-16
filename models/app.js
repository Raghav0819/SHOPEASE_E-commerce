// Cart Schema
const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 } // Optional: Allow multiple items
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
