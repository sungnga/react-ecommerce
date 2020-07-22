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
    })
  })
};
