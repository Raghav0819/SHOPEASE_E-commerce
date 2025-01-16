// Add to Cart Route
app.post('/add-to-cart', async (req, res) => {
    const { userId, productId, name, price } = req.body;

    try {
        // Check if item already exists in the cart for the user
        let cartItem = await Cart.findOne({ userId, productId });
        if (cartItem) {
            // Update quantity if the item exists
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            // Add new item to cart
            cartItem = new Cart({ userId, productId, name, price });
            await cartItem.save();
        }

        res.status(200).json({ message: 'Item added to cart', cartItem });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});
