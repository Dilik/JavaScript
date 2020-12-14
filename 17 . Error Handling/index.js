const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

//in order to use morgan we need to call in our application
//this line of code will tell app to use every request the morgan middleware

app.use(morgan('tiny'));

//example code which does the same thing as morgan
//this code runs for all the requests
app.use((req, res, next) =>{
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
}); 

//this will run only for requuest to dogs
app.use('/dogs', (req, res, next)=>{
    console.log('I Love Dogs');
    next();
})

app.get('/', (req, res)=>{
    console.log(`REQUEST TIME: ${req.requestTime}`);
    res.send('Home Page')
});

app.get('/dogs', (req,res)=>{
    console.log(`REQUEST TIME: ${req.requestTime}`);
    res.send('Dogs WOOF WOOF Page')
});

//error code example 
app.get('/error', (req, res)=>{
    fly();
})

//example how function passed to route to protect it for authentication
const verifyPassword = (req, res, next)=>{
    const {password} = req.query;
    if(password === 'mySecret'){
        next();
    }
    //custom error handling class call
    throw new AppError('Password required', 401);
    // res.status(401);
    // throw new Error('Password Required');
};

app.get('/secret', verifyPassword, (req, res)=>{
    res.send('I love Ice Cream');
})

app.get('/admin', (req, res)=>{
    throw new AppError('You are not admin', 403);
})

//this line runs if anything above didn't match for request
//this is like 404 not found request
app.use((req,res)=>{
    res.status(404).send('PAGE NOT FOUND')
})

//error handler hast to have 4 parametrs and neeeds to be used at the bottom
// app.use((err, req, res, next)=>{
//     console.log('***********************');
//     console.log('*********ERROR*********');
//     console.log('***********************');
//     next(err);
// })

app.use((err, req, res, next)=>{
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);
})
app.listen(3000, ()=>{
       console.log('Listening port 3000')
})