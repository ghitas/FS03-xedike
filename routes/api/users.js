const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

const {User} = require('../../models/users');
const {authorizing} = require('../../middleware/auth')

// api:     /api/users/register
// desc:    register a new user
// access:  PUBLIC
router.post('/register', (req, res) => {
    const {email, password, fullName, phone, DOB, userType} = req.body;

    User.findOne({$or: [{email}, {phone}]})
        .then(user => {
            // user exists
            if(user) return res.status(400).json({
                errors: 'Email or phone exists'})

            // user not exist
            const newUser = new User({
                email, password, fullName, phone, DOB, userType
            })

            bcrypt.genSalt(10, (err, salt) => {
                if(err) return res.status(400).json(err)

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) return res.status(400).json(err)

                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.status(200).json(user)
                        })
                        .catch(err => res.status(400).json(err))
                })
            })
        })
        .catch(err => res.status(400).json(err))        
})

// api:     /api/users/login
// desc:    log into system
// access:  PUBLIC
router.post('/login', (req, res) => {
    const {email, password} = req.body;

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(404).json({errors: "User not found"})

            bcrypt.compare(password, user.password)
                .then(result => {
                    if(!result) return res.status(400).json({errors: "Email not match password"})

                    const payload = {
                        id: user._id,
                        email: user.email,
                        userType: user.userType,
                        fullName: user.fullName
                    }
                    
                    jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        {expiresIn: '1h'},
                        (err, token) => {
                            if(err) return res.status(400).json(err)

                            res.status(200).json({
                                msg: "Login success",
                                token: "Bearer " + token
                            })
                        }
                    )
                })
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))

})

// test
router.get('/test',
    (req, res, next) => {
        console.log('mdw 1')
        next()
    },
    (req, res, next) => {
        console.log('mdw 2')
        next()
    },
    (req, res) => {
        res.json({msg: 'ket thuc'})
    }
)

// test-curent
// passenger
router.get('/test-private', 
    passport.authenticate('jwt', {session: false}),
    authorizing('passenger'),
    (req, res) => {
        res.json({msg: 'success'})
    }
)

module.exports = router;