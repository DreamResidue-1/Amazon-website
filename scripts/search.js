import {counter } from '../data/cart.js';
import {generateHtml} from './util/generateHtml.js';
import {searchBar,searchBtn} from "./util/searchBar.js";


const url = new URL(location.href);
const word = url.searchParams.get('word');

console.log(word);



let grid = document.querySelector('.js-products-grid');

let products = [];
async function Products() {
  const response = await fetch('../backend/products.json');
  const data = await response.json();
    
  products = data;
  products = await products.filter(element => element.name.toUpperCase()?.includes(word.toUpperCase()));
  
  document.querySelector('.cart-quantity').innerHTML = counter();
  
  grid.innerHTML  = '';
  grid.innerHTML = products.map(element => generateHtml(element)).join("");
 
  document.querySelectorAll('.limit-text-to-2-lines').forEach(par => {
    par.addEventListener('click', event => {
      event.target.classList.toggle('clicked');
    })

})

}

document.addEventListener("DOMContentLoaded", Products);


searchBar();
searchBtn();
