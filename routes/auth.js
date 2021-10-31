const router = require('express').Router();
const User = require('../model/User');
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")

/**
 * @route       GET /api/auth
 * @desc        Get User by id from request
 * @access      Private
 */
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        res.status(500).send("User not found");
    }
})

/**
 * @route       POST /api/auth/register
 * @desc        Register a user
 * @access      Public
 */
router.post(
    '/register',
    [
        check("name", "Please include a name").isLength({min: 6, max: 255}),
        check("email", "Please include a mail").isEmail().isLength({min: 6, max: 255}),
        check("password", "Please include a password with 6 or more characters").isLength({min: 6})
    ],
    async (req, res) => {

        // Validate the data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // Check if user is already registered
        const emailExist = await User.findOne({email: req.body.email});
        if (emailExist) {
            return res.status(400).send({errors: "Email already exists"});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        });

        try {
            const savedUser = await user.save();
            res.send({user: user._id});
        } catch (err) {
            res.status(400).send(err);
        }
    });

/**
 * @route       POST /api/auth/login
 * @desc        Authenticate user & get token
 * @access      Public
 */
router.post(
    '/login',
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please include a password with a minimum of 6 characters").isLength({min: 6})
    ],
    async (req, res) => {

        // Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // Check if user is already registered
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).send({errors: "User does not exists"});
        }

        // Check if password correct
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid password");
        }

        // Create and assign a token
        // Return jsonWebToken
        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {
                expiresIn: '3600s',
            },
            (err, token) => {
                if (err) throw err;
                res.header('x-auth-token', token);
                res.status(200).json({token});
            }
        );
    })

module.exports = router;
