window.onload = function init(){
    compute();
};

function checkData(){
           
        //checking amount field    
        if(principal=="" || principal<=0){
            alert("provide right value");
            principal.focus();
            return false;
        }
        
        //checking amount field    
        if(rate=="" || rate<=0 ){
            alert("provide right value");
            rate.focus();
            return false;
        }   
        return true;
    }

function compute(){
    
    var principal = document.getElementById("principal").value;
    var rate = document.getElementById("rate").value;
    var years = document.getElementById("years").value;
    var range = document.getElementById("myRange");
    var yearRep = new Date().getFullYear();
    var output = document.getElementById("rangeValue");

    //displaying range value
    output.innerHTML = range.value;
    
    //displaying range value everytime it changes
    range.oninput = function(){
        output.innerHTML = this.value;
    }

    rate.oninput = function(){
        yearRep += this.value;
    }

    checkData();
    var interest = principal * rate * years / 100;
    document.getElementById("result").innerHTML = "Interest rate: " + interest; 
 
        
 }  
