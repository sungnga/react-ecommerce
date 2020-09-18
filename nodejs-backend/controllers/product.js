const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.productById = (req, res, next, id) => {
	Product.findById(id)
		.populate('category')
		.exec((err, product) => {
			if (err || !product) {
				return res.status(400).json({
					error: 'Product not found'
				});
			}
			req.product = product;
			next();
		});
};

exports.read = (req, res) => {
	// We'll create a separate method to return photo
	req.product.photo = undefined;
	return res.json(req.product);
};

exports.create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: 'Image could not be uploaded'
			});
		}
		// Check all fields
		const { name, description, price, category, quantity, shipping } = fields;
		if (
			!name ||
			!description ||
			!price ||
			!category ||
			!quantity ||
			!shipping
		) {
			return res.status(400).json({
				error: 'All fields are required'
			});
		}

		let product = new Product(fields);

		if (files.photo) {
			// console.log(files.photo)
			if (files.photo.size > 1000000) {
				return res.status(400).json({
					error: 'Image size must be less than 1mb'
				});
			}
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		product.save((error, result) => {
			if (error) {
				return res.status(400).json({
					error: errorHandler(error)
				});
			}
			res.json(result);
		});
	});
};

exports.remove = (req, res) => {
	let product = req.product;
	product.remove((error, deletedProduct) => {
		if (error) {
			return res.status(400).json({
				error: errorHandler(error)
			});
		}
		res.json({
			message: 'Product deleted'
		});
	});
};

exports.update = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: 'Image could not be uploaded'
			});
		}
		// Check all fields
		// const { name, description, price, category, quantity, shipping } = fields;
		// if (
		// 	!name ||
		// 	!description ||
		// 	!price ||
		// 	!category ||
		// 	!quantity ||
		// 	!shipping
		// ) {
		// 	return res.status(400).json({
		// 		error: 'All fields are required'
		// 	});
		// }

		let product = req.product;
		product = _.extend(product, fields);

		if (files.photo) {
			// console.log(files.photo)
			if (files.photo.size > 1000000) {
				return res.status(400).json({
					error: 'Image size must be less than 1mb'
				});
			}
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		product.save((error, result) => {
			if (error) {
				return res.status(400).json({
					error: errorHandler(error)
				});
			}
			res.json(result);
		});
	});
};

/*
 * Display products by sell or arrival
 * By sell = /products?sortBy=sold&order=desc&limit=4
 * By arrival = /products?sortBy=createdAt&order=desc&limit=4
 * If no params are sent by client, then all products are returned
 */

exports.list = (req, res) => {
	// Check if order is given by the request query. Use the given query order, else set the order to ascending
	let order = req.query.order ? req.query.order : 'asc';
	// Check if sortBy is given by the request query. Use the given sortBy, else set the sortBy to _id
	let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
	// Check if limit is given by the request query. Use the given query limit, else set the limit by 6 as default
	let limit = req.query.limit ? parseInt(req.query.limit) : 6;

	Product.find()
		.select('-photo')
		.populate('category')
		.sort([[sortBy, order]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: 'Products not found'
				});
			}
			res.json(products);
		});
};

// Find the products based on the req product category
// Other products that has the same category, will be returned
exports.listRelated = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 6;

	// Find all the products in Product model based on the id, except the requested product itself
	// Use $ne for 'not included'
	// Also, find product based on the category
	Product.find({ _id: { $ne: req.product }, category: req.product.category })
		.limit(limit)
		.populate('category', '_id name')
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: 'Products not found'
				});
			}
			res.json(products);
		});
};

exports.listCategories = (req, res) => {
	Product.distinct('category', {}, (err, categories) => {
		if (err) {
			return res.status(400).json({
				error: 'Categories not found'
			});
		}
		res.json(categories);
	});
};

// list products by search
// we will implement product search in react frontend
// we will show categories in checkbox and price range in radio buttons
// as the user clicks on those checkbox and radio buttons
// we will make api request and show the products to users based on what the user wants
exports.listBySearch = (req, res) => {
	let order = req.body.order ? req.body.order : 'desc';
	let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
	let limit = req.body.limit ? parseInt(req.body.limit) : 100;
	let skip = parseInt(req.body.skip);
	let findArgs = {};

	// console.log(order, sortBy, limit, skip, req.body.filters);
	// console.log("findArgs", findArgs);

	for (let key in req.body.filters) {
		if (req.body.filters[key].length > 0) {
			if (key === 'price') {
				// gte -  greater than price [0-10]
				// lte - less than
				findArgs[key] = {
					$gte: req.body.filters[key][0],
					$lte: req.body.filters[key][1]
				};
			} else {
				findArgs[key] = req.body.filters[key];
			}
		}
	}

	Product.find(findArgs)
		.select('-photo')
		.populate('category')
		.sort([[sortBy, order]])
		.skip(skip)
		.limit(limit)
		.exec((err, data) => {
			if (err) {
				return res.status(400).json({
					error: 'Products not found'
				});
			}
			res.json({
				size: data.length,
				data
			});
		});
};

exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set('Content-Type', req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};

exports.listSearch = (req, res) => {
	// Create query object to hold search value and category value
	const query = {};
	// Assign search value to query.name
	if (req.query.search) {
		query.name = { $regex: req.query.search, $options: 'i' };
		// Assign category value to query.category
		if (req.query.category && req.query.category != 'All') {
			query.category = req.query.category;
		}
		// find the product based on query object with 2 properties
		// search and category
		Product.find(query, (err, products) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err)
				});
			}
			res.json(products);
		}).select('-photo');
	}
};

// Middleware that decreases the quantity in product
exports.decreaseQuantity = (req, res, next) => {
	let bulkOps = req.body.order.products.map((item) => {
		return {
			updateOne: {
				filter: { _id: item._id },
				update: { $inc: { quantity: -item.count, sold: +item.count } }
			}
		};
	});

	Product.bulkWrite(bulkOps, {}, (error, products) => {
		if (error) {
			return res.status(400).json({
				error: 'Could not update product'
			});
		}
		next();
	});
};
