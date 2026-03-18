import { counter } from '../data/cart.js';
import {generateHtml} from './util/generateHtml.js';

const url = new URL(location.href);
const word = url.searchParams.get('word');

console.log(word);





let products = [];
async function Products() {
  const response = await fetch('../backend/products.json');
  const data = await response.json();
    
  products = data;
  products = await products.filter(element => element.name.toUpperCase()?.includes(word.toUpperCase()));
  
  document.querySelector('.js-products-grid').innerHTML = products.map(element => generateHtml(element)).join("");
 
  document.querySelectorAll('.limit-text-to-2-lines').forEach(par => {
    par.addEventListener('click', event => {
      event.target.classList.toggle('clicked');
    })

       document.querySelector('.cart-quantity').innerHTML = counter();
})

}

document.addEventListener("DOMContentLoaded", Products);
