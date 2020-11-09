var canvas, ctx, w, h; 
var xFace = 10;
var yFace = 10;
var faceSpeed = 1;

window.onload = function init(){
    canvas = document.querySelector("#myCanvas");
    
    w = canvas.width;
    h = canvas.height;
    
    //draw with this object 
    ctx = canvas.getContext('2d');
    
    mainLoop();
}

function mainLoop(){
    //1 - clear canvas
    ctx.clearRect(0, 0, w, h);
    
    //2- draw the face
    drawFace(xFace, yFace);
    
    //3- move the face
    xFace += faceSpeed;

    //4- Test collision with boundries
    if(((xFace + 100) > w) || (xFace < 0)){
        //collision with left or right wall
        //change the directions of movement once reaches to boundries
        faceSpeed = -faceSpeed;
    }
    
    //5- requeest new frame of animation in 1/60s
    requestAnimationFrame(mainLoop);
}

function drawFace(x, y){
    //save the context, use 2D transformations
    ctx.save();
    
    //translate coordiante system to draw
    ctx.translate(x, y);
    
    //this is top left corner of face
    ctx.strokeRect(0, 0, 100, 100);

    //draw eyes, x=20, y relative to top left corner
    //of previouse rectangle
    ctx.fillRect(20, 20, 10, 10);
    ctx.fillRect(65, 20, 10, 10);
    
    //nose
    ctx.strokeRect(45, 40, 10, 40);
    
    //mouth
    ctx.strokeRect(35, 84, 30, 10);

    //teeth
    ctx.fillRect(38, 84, 10, 10);
    ctx.fillRect(52, 84, 10, 10);
    
    //store the context
    ctx.restore();        
}
