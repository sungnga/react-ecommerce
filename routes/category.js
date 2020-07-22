const express = require('express');
const router = express.Router();

const { create, categoryById, read } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/category/:categoryId', read);

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
