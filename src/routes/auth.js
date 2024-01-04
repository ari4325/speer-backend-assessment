// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const passHash = bcrypt.hashSync(password, salt);
  const newUser = new User({ username, password: passHash });

  try {
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

router.get('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.KEY);
    res.json({ token });
  });

module.exports = router;
