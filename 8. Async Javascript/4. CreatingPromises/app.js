const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if (rand < 0.7) {
                resolve(`YOUR FAKE DATA FROM: ${url}`);
            }
            reject(`Request Error FOR: ${url}`);
        }, 1000)
    })
}

// fakeRequest('/dogs/1')
//     .then((data) => {
//         console.log("DONE WITH REQUEST!")
//         console.log('data is:', data)
//         fakeRequest('/dogs/2')
//             .then((data) => {
//                 console.log("DONE WITH 2nd REQUEST!")
//                 console.log('data is:', data)
//             })
//             .catch((err) => {
//                 console.log("OH NO!", err)
//             })
//     })
//     .catch((err) => {
//         console.log("OH NO!", err)
//     })

fakeRequest('www.yelp.com/pag1')
    .then((data)=>{
        console.log("It Worked Page 1 !")
        console.log(data)
        return fakeRequest('www.yelp.com/pag2')
    })
    .then((data)=>{
        console.log("It Worked Page 2!")
        console.log(data);
        return fakeRequest('www.yelp.com/pag3')
    })
    .then((data)=>{
        console.log("It Worked Page 3!")
        console.log(data)
    })
    .catch((data)=>{
        console.log("Oh No Request Fails")
        console.log(data);
    })