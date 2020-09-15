const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.orderById = (req, res, next, id) => {
	Order.findById(id)
		.populate('products.product', 'name price')
		.exec((err, order) => {
			if (err || !order) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}
			// If we have the order, make that order available in the req object
			req.order = order;
			next();
		});
};

exports.create = (req, res) => {
	// console.log('CREATE ORDER: ', req.body);
	req.body.order.user = req.profile;
	const order = new Order(req.body.order);
	order.save((error, data) => {
		if (error) {
			return res.status(400).json({
				error: errorHandler(error)
			});
		}
		res.json(data);
	});
};

// Get orders from backend
exports.listOrders = (req, res) => {
	Order.find()
		.populate('user', '_id name address')
		.sort('-created')
		.exec((err, orders) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}
			res.json(orders);
		});
};

// Get enums status values
exports.getStatusValues = (req, res) => {
	res.json(Order.schema.path('status').enumValues);
};

// Update the order status in backend
exports.updateOrderStatus = (req, res) => {
	Order.update(
		{ _id: req.body.orderId },
		{ $set: { status: req.body.status } },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}
			res.json(order);
		}
	);
};
