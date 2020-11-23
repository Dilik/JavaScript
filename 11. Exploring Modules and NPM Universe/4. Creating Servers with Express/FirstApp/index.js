const express = require("express");
const app = express();

// app.use((req, res)=> {
//     console.log("We Got A New Request");
//     res.send('<h1>Welocme to Express !!!</h1>');   
// })

//routing
app.get('/', (req, res)=>{
    res.send('<h1>Welcome to Express, Nodemon is Monitoring the Port</h1>'); 
})

app.get('/dogs', (req, res)=>{
    res.send('<h1>Woof</h1>'); 
    console.log('woof');
})

app.post('/dogs', (req,res)=>{
    res.send("this is a POST request to dogs");
})

app.get('/cats', (req, res)=>{
    res.send('<h1>Meow</h1>')
})

//subredit - sub parameter passed to req.
app.get('/r/:subreddit', (req, res)=>{
    const {subreddit} = req.params
    res.send(`Welcome to the ${subreddit} subreddit`); 
})

//creating multiple subreddit path
app.get('/r/:subreddit/:postId', (req, res)=>{
    const {subreddit, postId} = req.params
    res.send(`Welcome to the post ID ${postId} udner ${subreddit} subreddit`); 
})

//search query
app.get('/search', (req, res)=>{
    const {q} = req.query;
    if(!q){
        res.send('Nothing found if nothing searched');
    }
    res.send(`Search result for ${q}`);
})

//use it at the end. if it is at the beginning it will disregard all
app.get('*', (req,res)=>{
    res.send("Error 404, Page Do Not Exist!")
})

app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
})