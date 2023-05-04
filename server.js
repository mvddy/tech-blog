const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Create user schema and model
const userSchema = new express.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = express.model('User', userSchema);

// Create blog post schema and model
const postSchema = new express.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: express.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    type: express.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = express.model('Post', postSchema);

// Create comment schema and model
const commentSchema = new express.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: express.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: express.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = express.model('Comment', commentSchema);

// JSON Middleware
app.use(express.json());

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// User registration
app.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).send('Username already taken');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).send('User created');
  } catch (err) {
    next(err);
  }
});

// User login endpoint
app.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send('Invalid');
    }}
    catch{error}}
);