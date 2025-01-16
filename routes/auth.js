const express = require('express');
const router = express.Router();

let users = [{ username: 'user1', password: 'pass123' }];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
