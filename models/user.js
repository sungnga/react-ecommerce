const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			require: true,
			maxlength: 32
		},
		email: {
			type: String,
			trim: true,
			require: true,
			unique: 32
		},
		hashed_password: {
			type: String,
			require: true
		},
		about: {
			type: String,
			trim: true
		},
		salt: String,
		role: {
			type: Number,
			default: 0
		},
		history: {
			type: Array,
			default: []
		}
	},
	{ timestamps: true }
);

// Virtual field
userSchema
	.virtual('password')
	.set(function (password) {
		this._password = password;
		this.salt = uuidv4();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

userSchema.methods = {
	authenticate: function (plainText) {
		// This will return true or false
		return this.encryptPassword(plainText) === this.hashed_password;
	},
	encryptPassword: function (password) {
		if (!password) return '';
		try {
			return crypto
				.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex');
		} catch (err) {
			return '';
		}
	}
};

module.exports = mongoose.model('User', userSchema);
