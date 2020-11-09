const allImages = document.getElementsByTagName('img');

for(let img of allImages){
    console.log(img.src)
}

const allLinks = document.querySelectorAll('p a');

for(let link of allLinks){
    console.log(link.href)
}

//changing style
const h2 = document.querySelector('h2');
h2.setAttribute('class','purple');
h2.classList.add('border')
// turn on and off class
h2.classList.toggle('purple')
h2.classList.toggle('purple')

//previous elemen / next element siblings

const image = document.querySelector('.square');
console.log(image.nextElementSibling);
console.log(image.previousElementSibling);

//adding new tag to adjecent element
const newh2 = document.createElement('h2');
newh2.innerText = 'are addorable animals';
const h1 = document.querySelector('h1');
h1.insertAdjacentElement('afterend', newh2);