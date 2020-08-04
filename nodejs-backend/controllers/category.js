const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if (err || !category) {
			return res.status(400).json({
				error: 'Category does not exist'
			});
		}
		req.category = category;
		next();
	});
};

exports.create = (req, res) => {
	// Create a new category based on the request of body
	const category = new Category(req.body);
	category.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json({ data });
	});
};

exports.read = (req, res) => {
	return res.json(req.category);
};

exports.update = (req, res) => {
	// Get the category
	const category = req.category;
	category.name = req.body.name;
	category.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json(data);
	});
};

exports.remove = (req, res) => {
	// Get the category
	const category = req.category;
	category.remove((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
    res.json({
      message: 'Category is deleted'
    });
	});
};

exports.list = (req, res) => {
  // Find the categories in category model
  Category.find().exec((err, data) => {
    if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json(data);
  })
};
