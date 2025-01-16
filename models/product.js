const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

// Product Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
