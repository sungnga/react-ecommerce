const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.productById = (req, res, next, id) => {
	Product.findById(id).exec((err, product) => {
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
			res.send(products);
		});
};

// Find the products base on the req product category
// Other products that has the same category,  it will return
exports.listRelated = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 6;

	Product.find({ _id: { $ne: req.product }, category: req.product.category })
		.limit(limit)
		.populate('category', '_id name')
		.exec((err, product) => {
			return res.status(400).json({
				error: 'Products not found'
	})
}
