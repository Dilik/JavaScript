const express = require('express')
const router = express.Router();
const catchAsync = require('../util/catchAsync');
const ExpressError = require('../util/ExpressError');
const Product = require('../models/product');
const { isLoggedIn, validateProduct, isAuthor } = require('../middleware');
const products = require('../controllers/products');
const multer = require('multer');
const upload = multer({dest: '/upload'});
router.route('/')
    .get(catchAsync(products.index))
    // .post(isLoggedIn, validateProduct, catchAsync(products.createNewProduct))
    .post(upload.array('image'), (req, res)=>{
        console.log(req.body, req.file);
        res.send('It Worked')
    })

router.get('/new', isLoggedIn, products.newProductForm);

router.route('/:id')
    .get(catchAsync(products.showProduct))
    .put(isLoggedIn, isAuthor, validateProduct, catchAsync(products.updateProduct))
    .delete(isLoggedIn, isAuthor, catchAsync(products.deleteProduct))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(products.editForm));

module.exports = router;