const User = require("../models/User");
const Pitcher = require("../models/Pitcher");
const Shark = require("../models/Shark");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, accountType } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      accountType
    });

    const savedUser = await newUser.save();

    // If user is a shark or a pitcher, create corresponding document
    if (accountType === "shark") {
      await Shark.create({
        userId: savedUser._id,
        name: username, // or more fields from req.body
        bio: ""
      });
    } else if (accountType === "pitcher") {
      await Pitcher.create({
        userId: savedUser._id,
        companyName: "",
        companyDescription: "",
        pitchVideoUrl: ""
      });
    }

    res.status(201).json({ msg: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        accountType: user.accountType,
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};