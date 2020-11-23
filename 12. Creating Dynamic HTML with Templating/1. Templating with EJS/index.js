const express = require('express');
const app = express();
const path = require('path');
const reditData = require('./data.json');
 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/templates'));

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/rand', (req, res)=>{
    const random = Math.floor(Math.random()*10)+1;
    res.render('random',{random})
})

app.get('/cat', (req, res)=>{
    const cats = ['Alli', 'jimmy', 'carter', 'smokey'];
    res.render('cat', { cats });
})

app.get('/r/:subreddit', (req, res)=>{
    const {subreddit} = req.params;
    const data = reditData[subreddit]; 
    if(data){
        res.render('subreddit', {...data})
    } else {
        res.render('notfound', {subreddit})
    }
})

app.listen('3000', ()=>{
    console.log('Listening Port 3000');
})