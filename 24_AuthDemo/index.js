const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/authDemo', {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
})

//check db conncetion
const db = mongoose.connection; 
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'thisisnotagoodsecret'}));

// middleware to check if user logged in or not
const requireLogin = ((req, res, next)=>{
    if(!req.session.user_id){
        return res.redirect('/login');
    }
    next();  
})

app.get('/', (req, res)=>{
    res.send('Welcome to Authentication Tutorial')
})

app.get('/register', (req,res)=>{
    res.render('register');
})

app.post('/register', async(req, res)=>{
    const {password, username} = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/secret');
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.post('/login', async(req, res)=>{
    const {username, password} = req.body;
    // const user = await User.findOne({ username });
    // const validPass = await bcrypt.compare(password, user.password);
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser){
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    }else{
        res.redirect('/login');
    }
})

app.post('/logout', (req, res)=>{
    req.session.user_id = null;
    // req.session.destroy();
    res.redirect('/login');
})

app.get('/secret', requireLogin, (req, res)=>{
    res.render('secret');
})

app.get('/topsecret', requireLogin, (req, res)=>{
    res.send('Top Secret Access Approved')
})

app.listen(3000, ()=>{
    console.log('Serving app at localhost: 3000')
})