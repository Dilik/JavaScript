const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecretcookie'));

app.get('/greet', (req, res)=>{
    const { name = 'Anonymous' } = req.cookies;
    res.send(`Hey There, ${name}`);
})

app.get('/setname', (req, res)=>{
    res.cookie('name', 'mickie mouse');
    res.cookie('animal','doggie');
    res.send('Sending you a Cookie')
})

app.get('/getsignedcookie', (req, res)=>{
    res.cookie('fruit', 'apple', {signed: true});
    res.send('OK Signed your cookie');
})

app.get('/verifyfruit', (req, res)=>{
    res.send(req.signedCookies);
})

app.listen(3000, ()=>{
    console.log('Serving the app at localhost:3000');
})