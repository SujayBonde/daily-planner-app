const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

// @route   POST /users/register
// @desc    Register new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const newUser = new User({ email, password });

    // Create salt & hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    
    await newUser.save();
    res.json({ msg: 'Registration successful!' });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @route   POST /users/login
// @desc    Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.json({
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;