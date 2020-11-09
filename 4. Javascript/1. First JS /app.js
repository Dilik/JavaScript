console.log("This is my first JS file");

console.log("h1");

let username = prompt("Please enter username"); 

if( !(username) || username.length <= 5 || username.indexOf(' ') !== -1){
     console.log("username cannot be less than 5 character or have a space");
     username = prompt("Please enter username");
    }
    else
    console.log("Well Done!"); 
    