// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Correctly added path module
require('dotenv').config(); // To use environment variables from .env file

const app = express();

// Middleware and static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./assets"))); // Serve static files from 'assets'
app.use(express.static(path.resolve("./scripts"))); // Serve static files from 'scripts'

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Routes

// E-commerce Routes
app.get('/', (req, res) => res.render('e-commerce'));
app.get('/login', (req, res) => res.render('login'));
app.get('/loggedin', (req, res) => res.render('loggedin'));
app.get('/myorder', (req, res) => res.render('myorder'));
app.get('/cart', (req, res) => res.render('cart'));
app.get('/payment-method', (req, res) => res.render('payment-method'));
app.get('/payment1', (req, res) => res.render('payment1'));
app.get('/order-confirmed', (req, res) => res.render('order-confirmed'));

// CRUD Operations for User

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create and save new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a user
app.put('/users/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


const Cart = require('./models/cartss');

// Add item to cart
app.post('/add-to-cart', async (req, res) => {
    try {
        const { userId, productId, name, price } = req.body;

        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({ userId, items: [] });
        }

        // Check if the item is already in the cart
        const existingItem = cart.items.find(item => item.productId === productId);

        if (existingItem) {
            // Update quantity if the item already exists
            existingItem.quantity += 1;
        } else {
            // Add new item to the cart
            cart.items.push({ productId, name, price });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

const payments = require('./models/payment');

app.post('/pay', async (req, res) => {
    try {
        console.log('Received body:', req.body);
        
        const { cardNumber, expDate, cvv } = req.body;

        // Validate input before creating
        if (!cardNumber || !expDate || !cvv) {
            return res.status(400).send('Missing required payment details');
        }
        
        const payment = await payments.create({
            cardNumber: cardNumber,
            expDate: new Date(expDate), // Ensure date is properly converted
            cvv: cvv
        });

        console.log('Payment created - Full Document:', payment.toObject()); // Use toObject to see full document

        return res.redirect('/order-confirmed');
    }
    catch (err) {
        console.error('Error creating payment:', err);
        return res.status(500).send(`Error: ${err.message}`);
    }
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));


