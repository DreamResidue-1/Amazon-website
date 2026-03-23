import {counter } from '../data/cart.js';
import {generateHtmlProduct} from './generateHtml/product.js';
import {searchBar,searchBtn} from "./util/searchBar.js";


const url = new URL(location.href);
const word = url.searchParams.get('word');

console.log(word);



let grid = document.querySelector('.js-products-grid');

let products = [];
async function Products() {
  const response = await fetch('../backend/products.json');
  const data = await response.json();
    
  let newProducts = []
  products = data;
  newProducts =  products.filter(element => {
    
    if(element.name.toUpperCase()?.includes(word.toUpperCase()) )
    return element.name.toUpperCase()?.includes(word.toUpperCase())
    else 
   {
      {
      // 1. Normalize the search term to uppercase
      const searchWord = word.toUpperCase();

      // 2. Use .some() for a cleaner boolean check
      const isMatch = element.keywords.some(keyword => 
        keyword.toUpperCase().includes(searchWord)
      );

      if (isMatch) {
        return element;
      }
     }
   }
  }
  );
  
  document.querySelector('.cart-quantity').innerHTML = counter();
  
  grid.innerHTML = '';
  grid.innerHTML =  newProducts.map(element => generateHtmlProduct(element)).join("");

  
  if(grid.innerHTML === ''){
    grid.innerHTML = `
    <div style="margin:auto; position:absolute; top:50%; left:50%; transform:translate(-50%); white-space:nowrap; text-align:center;"
    >There is no product matches the ${word}
    <a style="color:red" href="amazon.html">back</a>
    </div>
    `
  }
  document.querySelectorAll('.limit-text-to-2-lines').forEach(par => {
    par.addEventListener('click', event => {
      event.target.classList.toggle('clicked');
    })
})
}
document.addEventListener("DOMContentLoaded", Products);


searchBar();
searchBtn();

