// Load existing orders from localStorage or start with an empty array
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  // .unshift adds the newest order to the TOP of the list
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

import deliveryOptions from './deliveryOptions.js';
// You'll need to import your products array to calculate the total cost
import  { loadProductsFetch, Product } from './products.js';

export async function generateLocalOrder(cart, totalCostCents) {
  // 1. Generate a unique ID (using the built-in browser crypto API)
  const orderId = crypto.randomUUID();

  // 2. Get the current time in ISO format
  const orderTime = new Date().toISOString();

  // 3. Calculate delivery time (e.g., 7 days from now)
;

  // 4. Calculate total cost (loop through cart and find prices in products.js)
  

  let products = await loadProductsFetch();
  const orderProducts = cart.map((cartItem) => {
    // Find the matching product to get the price
    const matchingProduct = products.find(p => p.id === cartItem.productId);
    // if (matchingProduct) {
    //   totalCostCents += matchingProduct.priceCents * cartItem.quantity;
    // }

    const deliveryDate = new Date();
    let addToDays;
    deliveryOptions.forEach( deliveryOption =>
       { if(cartItem.deliveryOptionId == deliveryOption.id)
           addToDays = deliveryOption.days;
      }) ;
      deliveryDate.setDate(deliveryDate.getDate() + addToDays);   
      const estimatedDeliveryTime = deliveryDate.toISOString()
    // Return the specific structure the backend uses
    return {
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      estimatedDeliveryTime: estimatedDeliveryTime,
      variation: addToDays
    };
  });

  // 5. Construct the final object
  const order = {
    id: orderId,
    orderTime: orderTime,
    totalCostCents: totalCostCents,
    products: orderProducts
  }
  addOrder(order)
  return order ;
}