const express = require("express");
const app = express();

app.use(()=> {
    console.log("We Got A New Request");
})

app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
})