import { addToCart , counterCart } from "./data/cart.js";
import { loadProductsFetch } from "./data/products.js";
import {generateHtmlProduct} from "./generateHtml/product.js";
import {searchBar,searchBtn} from "./util/searchBar.js";
import { headerActive } from "./util/header-responsive.js";
import './image-profile.js';

let  productCollection = [];

async function Products() {

  
  productCollection = await loadProductsFetch();
  
  document.querySelector('.js-products-grid').innerHTML =
  productCollection.map(element => generateHtmlProduct(element)).join("");
  
  document.querySelectorAll('.limit-text-to-2-lines').forEach(par => {
    par.addEventListener('click', event => {
      event.target.classList.toggle('clicked');
    })
    
    document.querySelector('.cart-quantity').innerHTML = counterCart();
    document.querySelector('.js-cart-mobile-quantity').innerHTML = counterCart();
    console.log(document.querySelector('.js-cart-mobile-quantity'))
  })
  headerActive();

}
document.addEventListener("DOMContentLoaded", Products())

// document.addEventListener("DOMContentLoaded", () =>{

//   loadProducts().then(()=>{

//     new Promise((resolve, reject)=>{
//       console.log(products)
//       if(products.length > 0)
//         resolve('load products')
//       else 
//         reject('Can not load products')
//     }).then((value)=>{
//       Products()
//       console.log(value)
//     }).catch(error => console.error(error));
//   })
// });
let clearSetTimeOut ;
// This can stay outside the function
document.querySelector('.js-products-grid').addEventListener('click', (event) => {
  // Check if the clicked element (or its parent) is the button
  const button = event.target.closest('.js-add-to-cart-button');
  
  if (button) {

    let id = button.dataset.id;
    let quantity = +document.querySelector(`.select${id}`).value
    clearTimeout(clearSetTimeOut);

    clearSetTimeOut = setTimeout(() =>{
    document.querySelector('.added'+id).style.visibility = 'hidden'
    console.log(document.querySelector('.js-cart-mobile-quantity'))
    },2000)
    document.querySelector('.added'+id).style.visibility = 'visible'

    addToCart(id,quantity);
    
    document.querySelectorAll('.cart-quantity').forEach(cartQuanitiy => {
      cartQuanitiy.innerHTML = counterCart();
    } )
    
   
  }
});

searchBar();
searchBtn();