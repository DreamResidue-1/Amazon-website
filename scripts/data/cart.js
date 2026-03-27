// import { deliveryOptions  } from "./deliveryOptions.js";

// export let cart;
// loadFromStorage();

// export function loadFromStorage(){
//   cart = JSON.parse(localStorage.getItem('cart')) || [];
// }


// function saveProduct(){
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// export function addToCart(productId, quantity){
//   const product = cart.find(element => element.id === productId);
//   if(product){
//     product.quantity+=quantity;
//   }else {
//     cart.push({productId,quantity,deliveryOptionId:1});
//   }
//   saveProduct();
// }

// export function deleteFromCart(id){
//     let newCart = cart.filter(cartItem => cartItem.id !== id);
//     cart = newCart;
//     saveProduct();
// }
// export function counter() {
//   let count = 0;
//   cart.forEach(product => {
//       count += product.quantity;
//   })
//   return count;
// }

// export function updateFromCart(id, quantity) {
//   let mattingItem = cart.find(cartItem => cartItem.id == id);
//   mattingItem.quantity = quantity;
//   saveProduct();
// }

// export function updateDeliveryOption(productId,deliveryOptionId){
//   let matchingItem  = cart.find(cartItem => cartItem.id === productId)
//   matchingItem.deliveryOptionId =  deliveryOptionId;
//   saveProduct();
// }


import { deliveryOptions } from "./deliveryOptions.js";

export let cart;
loadFromStorage();

export function loadFromStorage() {
  return new Promise((resolve) => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    resolve();
  })
}
export function reset(){
  localStorage.removeItem('cart');
  cart  = [];
}
function saveProduct() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  // Use productId consistently
  const product = cart.find(element => element.productId === productId);
  
  if (product) {
    product.quantity += quantity;
  } else {
    // Standardizing deliveryOptionId to a string '1'
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1' 
    });
  }
  saveProduct();
}

export function deleteFromCart(productId) {
  // Changed cartItem.id to cartItem.productId
  const newCart = cart.filter(cartItem => cartItem.productId !== productId);
  cart = newCart;
  saveProduct();
}
export function counter(){
  let count = 0;
  cart.forEach(product => {
    count += product.quantity;
  });
  return count > 0 ? count : 0;
}
export function counterCart() {
  let count = counter();
  //document.querySelector(`.${className}`).innerHTML = count;
  return  count;
}

export function updateFromCart(productId, quantity) {
  let matchingItem = cart.find(cartItem => cartItem.productId === productId);
  if (matchingItem) {
    matchingItem.quantity = quantity;
    saveProduct();
    return true;
  }
  return false;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem = cart.find(cartItem => cartItem.productId === productId);
  
  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveProduct();
  }
}