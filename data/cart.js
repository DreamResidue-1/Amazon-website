import { deliveryOptions  } from "./deliveryOptions.js";

export let cart;
loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}


function saveProduct(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(id, quantity){
  const product = cart.find(element => element.id === id);
  if(product){
    product.quantity+=quantity;
  }else {
    cart.push({id,quantity,deliveryOptionId:1});
  }
  saveProduct();
}

export function deleteFromCart(id){
    let newCart = cart.filter(cartItem => cartItem.id !== id);
    cart = newCart;
    saveProduct();
}
export function counter() {
  let count = 0;
  cart.forEach(product => {
      count += product.quantity;
  })
  return count;
}

export function updateFromCart(id, quantity) {
  let mattingItem = cart.find(cartItem => cartItem.id == id);
  mattingItem.quantity = quantity;
  saveProduct();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem  = cart.find(cartItem => cartItem.id === productId)
  matchingItem.deliveryOptionId =  deliveryOptionId;
  saveProduct();
}
