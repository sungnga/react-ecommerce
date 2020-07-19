const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { v4: uuidv4 } = require('uuid');

console.log(uuidv4());

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
