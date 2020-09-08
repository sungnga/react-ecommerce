const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config();

// gateway connects to braintree
const gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: process.env.BRAINTREE_MERCHANT_ID,
	publicKey: process.env.BRAINTREE_PUBLIC_KEY,
	privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

exports.generateToken = (req, res) => {
	gateway.clientToken.generate({}, function (err, response) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(response);
		}
	});
};

exports.processPayment = (req, res) => {
	// We need the payment metod and total amount that comes from the client side
	let nonceFromTheClient = req.body.paymentMethodNonce;
	let amountFromTheClient = req.body.amount;
	// Charge
	let newTransaction = gateway.transaction.sale(
		{
			amount: amountFromTheClient,
			paymentMethodNonce: nonceFromTheClient,
			options: {
				submitForSettlement: true
			}
		},
		(error, result) => {
			if (error) {
				res.status(500).json(error);
			} else {
				res.json(result);
			}
		}
	);
};
