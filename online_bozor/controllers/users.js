const User = require('../models/user');


const categories = ['', 'furnitures', 'cars', 'baked items', 'vitamins', 'cell-phones', 'electronics', 'toys',
    'food', 'laptops', 'other'
];

module.exports.userRegisterForm = (req, res) => {
    res.render('users/register', { categories });
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome to OnlineBozor ${req.user.username}!`);
            res.redirect('/products');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.loginForm = (req, res) => {
    res.render('users/login', { categories })
}

module.exports.login = async (req, res) => {
    req.flash('success', `Welcome Back ${req.user.username} !`);
    const redirectUrl = req.session.returnTo || '/products';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Good Bye!');
    res.redirect('/');
}