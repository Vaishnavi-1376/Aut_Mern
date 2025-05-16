const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { DBConnection } = require("./database/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());



dotenv.config();
DBConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello, world, is coming from backend index.js!");
});

app.post("/register", async (req, res) => {
    try {
        //get all the data from the frontend
        const { firstname, lastname, email, password } = req.body;

        //check that all the data should exists
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("please enter all the information");
        }

        //check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists with the same email");
        }

        //hashing the encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //save the user in the database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        //generate a token for user and and send it 
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        },
        );
        user.password = undefined;
        res.status(200).json({ message: "you have successfully registered!", user,token });
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong during registration");
    }
});
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!(email && password)) {
            return res.status(400).send("Please enter both email and password");
        }

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        // Compare the provided password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid email or password");
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Exclude password from response
        user.password = undefined;

        res.status(200).json({
            message: "Login successful",
            user,
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Something went wrong during login");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}!`);
});