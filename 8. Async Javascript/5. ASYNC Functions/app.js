// const sing = async () =>{
//     throw "Oh No, Problem"
//     return 'Successfull'
// }

// sing()
//     .then(data =>{
//         console.log("Promise resolved with:", data);
//     })
//     .catch(err =>{
//         console.log("Oh No, Promise has been Rejacted")
//         console.log(err)
//     })

const login = async(username, password)=>{
    if(!username || !password) throw 'Missing Credentials'
    if(password === 'ThisIsAPassword') return 'Welcome'
    throw "Wrong Password"
}

login('Dilmurod', 'ThisIsAPassword')
    .then(msg =>{
        console.log('Logged In')
        console.log(msg)
    })
    .catch(err =>{
        console.log('Error!'); 
        console.log(err);
    })

const delayedColorChange = (color, delay) =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

async function rainbow(){
    await delayedColorChange('red', 1000)
    await delayedColorChange('orange', 1000)
    await delayedColorChange('yellow', 1000)
    await delayedColorChange('green', 1000)
    await delayedColorChange('blue', 1000)
    await delayedColorChange('indigo', 1000)
    await delayedColorChange('violet', 1000)
}
rainbow().then(()=> console.log('End of rainbow'))