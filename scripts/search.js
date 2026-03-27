import {counterCart } from './data/cart.js';
import { products, loadProductsFetch } from './data/products.js';
import {generateHtmlProduct} from './generateHtml/product.js';
import {searchBar,searchBtn} from "./util/searchBar.js";
import { addToCart } from './data/cart.js';
import { headerActive } from './util/header-responsive.js';
import './image-profile.js';


const url = new URL(location.href);
const word = url.searchParams.get('word');

console.log(word);



let grid = document.querySelector('.js-products-grid');

headerActive();
async function Products() {
    
  let newProducts = []
  let productsCollection = await loadProductsFetch()
  newProducts =  productsCollection.filter(element => {
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
  
   document.querySelectorAll('.cart-quantity').forEach(cartQuantity => {
    cartQuantity.innerHTML =  counterCart();
  })
  grid.innerHTML =  newProducts.map(element => generateHtmlProduct(element)).join("");

  if(grid.innerHTML === ''){
    grid.innerHTML = `
    <div style="margin:auto; position:absolute; top:50%; left:50%; transform:translate(-50%); white-space:nowrap; text-align:center;"
    >There is no product matches the ${word}
    <a style="color:red" href="index.html">back</a>
    </div>
    `
  }
  document.querySelectorAll('.limit-text-to-2-lines').forEach(par => {
    par.addEventListener('click', event => {
      event.target.classList.toggle('clicked');
    })
})
}

let clearSetTimeOut;
document.addEventListener("DOMContentLoaded", Products);
document.querySelector('.js-products-grid').addEventListener('click', (event) => {
  // Check if the clicked element (or its parent) is the button
  const button = event.target.closest('.js-add-to-cart-button');
  
  if (button) {

    let id = button.dataset.id;
    let quantity = +document.querySelector(`.select${id}`).value
    clearTimeout(clearSetTimeOut);

    clearSetTimeOut = setTimeout(() =>{
    document.querySelector('.added'+id).style.visibility = 'hidden'
    },2000)
    document.querySelector('.added'+id).style.visibility = 'visible'

    document.querySelectorAll('.cart-quantity').forEach(cartQuantity => {
    cartQuantity.innerHTML =  counterCart();
  })
    addToCart(id,quantity);
   }
});


searchBar();
searchBtn();

