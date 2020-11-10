const form = document.querySelector('form');
const post = document.querySelector('#list');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const product = form.elements.product;
    const quantity = form.elements.qty;
    print(quantity.value, product.value);
    product.value = '';
    quantity.value = '';

})

const print = (quantity, product)=>{
    const newList= document.createElement('li');
    newList.innerText = `${quantity} ${product}`;
    post.append(newList);
}

const feedback = document.querySelector('#inputFeedback');
const h2Feedback = document.querySelector('h2');
feedback.addEventListener('input', ()=> {
    h2Feedback.innerText = feedback.value;
})