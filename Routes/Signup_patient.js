const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

router.post("/signup_patient",
    [
        body('email').isEmail(),
        body('password', 'Minimum password length is 5').isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await Patient.create({
                name: req.body.name,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                email: req.body.email,
                password: hashedPassword
            });
            res.json({ success: true });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    });

router.post("/login_patient",
    async (req, res) => {
    let email = req.body.email;
        try {
            // const hashedPassword = await bcrypt.hash(req.body.password, 10);
            let userData = await Patient.findOne({email});
            // res.json({ success: true });
            if(!userData){
                return res.status(400).json({ errors: "Invalid Email id"});
            }

            if(!bcrypt.compare(req.body.password, userData.password)){
                return res.status(400).json({ errors: "Enter correct password"});
            }
            res.json({ success: true });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    });

module.exports = router;
