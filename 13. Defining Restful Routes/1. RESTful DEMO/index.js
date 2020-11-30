// GET /comments - list all comments
// GET /comments/:id - list one comment
// POST /comments = create new comment
// GET /comments/:id - get one comment
// PATCH /comments/:id - update one comment
// GET /comment/:id/edit - edit one comment
// DELETE /comments/:id - delete one comment

const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const {v4: myuuid} = require('uuid');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

//fake database
let comments = [
    {
        id:myuuid(),
        username: 'Todd',
        comment: 'It is so nice to see a dawn'
    },
    {
        id:myuuid(),
        username: 'Ski',
        comment: 'What is in my mind'
    },
    {
        id:myuuid(),
        username: 'Omar',
        comment: 'What is the reasons behind being born and dying'
    }
];

//CRUD - create, read, update, delete
//Read portion
app.get('/comments', (req, res)=>{
    res.render('comments/index', {comments});
})

//create new comment
app.get('/comments/new', (req,res)=>{
    res.render('comments/new');
})// GET /comments - list all comments
// GET /comments/:id - list one comment
// POST /comments = create new comment
// GET /comments/:id - get one comment
// PATCH /comments/:id - update one comment
// GET /comment/:id/edit - edit one comment
// DELETE /comments/:id - delete one comment

//IOT create we need to POST inputed data 
app.post('/comments', (req, res)=>{
    const {username, comment} = req.body;
    comments.push({ username, comment, id: myuuid() });
    //express redirect to comment page.
    //if we don't, post /comments keeps repeating
    //will not get to get /comments page 
    res.redirect('/comments');
})

//show one specific comment
app.get('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment});
})

//edit page
app.get('/comments/:id/edit', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

//updating a comment
app.patch('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const newComment = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res)=>{
    const {id} = req.params;
    comments = comments.filter(c=> c.id !== id);
    res.redirect('/comments');
})

app.get('/taco', (req, res)=>{
    res.send("Get /taco response")
})

app.post('/taco', (req, res)=>{
    const {meat, qty} = req.body;
    res.send(`here is your ${qty} x ${meat} tacos`);
})

app.listen(3000, ()=>{
    console.log('Listening PORT 3000')
})



