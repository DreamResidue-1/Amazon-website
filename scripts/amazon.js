import { addToCart, counter} from "../data/cart.js";
import {generateHtml} from "./util/generateHtml.js";

let products = [];
async function Products() {
  const response = await fetch('../backend/products.json');
  const data = await response.json();
    
  products = data;
  
  document.querySelector('.js-products-grid').innerHTML = products.map(element => generateHtml(element)).join("");
 
  document.querySelectorAll('.limit-text-to-2-lines').forEach(par => {
    par.addEventListener('click', event => {
      event.target.classList.toggle('clicked');
    })

       document.querySelector('.cart-quantity').innerHTML = counter();
})

}

document.addEventListener("DOMContentLoaded", Products);

// This can stay outside the function
document.querySelector('.js-products-grid').addEventListener('click', (event) => {
  // Check if the clicked element (or its parent) is the button
  const button = event.target.closest('.js-add-to-cart-button');
  
  if (button) {

    let id = button.dataset.id;
    let quantity = +document.querySelector(`.select${id}`).value
    setTimeout(() =>{
      document.querySelector('.added'+id).style.opacity = '0'
    },2000)
      document.querySelector('.added'+id).style.opacity = '1'

    addToCart(id,quantity);
  
       document.querySelector('.cart-quantity').innerHTML = counter();
  }
});


document.querySelector('input.search-bar').addEventListener('keydown', event =>{
  if(event.key === 'Enter'){
    let value = event.target.value;
    if(!value.trim()){

      let popUp = document.querySelector('.search-bar-conainer .pop-up');
      popUp.innerHTML = 'Invalid input';
      popUp.style.opacity = '1';
      setTimeout(() => {
        popUp.style.opacity = '0';
      }, 2000);

    }else{
      
     search(value)

    }
  }
})


function search(q){
 
  
  location.href = `search.html?word=${q}`;

}