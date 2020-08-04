const jwt = require('jsonwebtoken'); // to generate signed token
const expressJWT = require('express-jwt'); // for authorization check
const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
	// the .body came from body-parser
	console.log('req.body', req.body);
	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				err: errorHandler(err)
			});
		}
		user.salt = undefined;
		user.hashed_password = undefined;
		res.json({
			user
		});
	});
};

exports.signin = (req, res) => {
	// Find the user based on email
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User with that email does not exist. Please signup'
			});
		}
		// If user is found, make sure the email and password match
		// Create authenticate method in user model
		if (!user.authenticate(password)) {
			// 401 status code is unauthorized
			return res.status(401).json({
				error: "Email and password don't match"
			});
		}

		// Generate a signed token with user id and secret
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		// Persist the token as 't' in cookie with expiry date
		res.cookie('t', token, { expire: new Date() + 9999 });
		// Return response with user and token to frontend client
		const { _id, name, email, role } = user;
		return res.json({ token, user: { _id, email, name, role } });
	});
};

exports.signout = (req, res) => {
	// Clear the cookie from the response
	res.clearCookie('t');
	res.json({ message: 'Successfully signout' });
};

// Middleware to require a user to signin
exports.requireSignin = expressJWT({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256']
});

// Middleware for authenticated user
exports.isAuth = (req, res, next) => {
	let user = req.profile._id == req.user.id;
	//console.log(req.user)
	if (!user) {
		return res.status(403).json({
			error: 'Access denied'
		});
	}
	next();
};

// Middleware for admin user
exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: 'Admin resource! Access denied'
		});
	}
	next();
};
