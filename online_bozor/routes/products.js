const express = require('express')
const router = express.Router();
const catchAsync = require('../util/catchAsync');
const ExpressError = require('../util/ExpressError');
const { isLoggedIn, validateProduct, isAuthor } = require('../middleware');
const products = require('../controllers/products');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(products.index))
    .post(isLoggedIn, upload.array('image'), validateProduct, catchAsync(products.createNewProduct))

router.get('/new', isLoggedIn, products.newProductForm);

router.route('/:id')
    .get(catchAsync(products.showProduct))
    .put(isLoggedIn, isAuthor,upload.array('image'), validateProduct, catchAsync(products.updateProduct))
    .delete(isLoggedIn, isAuthor, catchAsync(products.deleteProduct))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(products.editForm));

module.exports = router;