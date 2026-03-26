import { addOrder , generateLocalOrder } from '../../data/orders.js'; // Adjust path if needed
import * as cart from '../../data/cart.js';
import {products,loadProductsFetch} from '../../data/products.js';
import deliveryOptions from '../../data/deliveryOptions.js';
import { generateHtmlPaymentSummary  } from '../generateHtml/paymentSummary.js';
let totalCostCents = 0;
const paymentSummary =  document.querySelector('.js-payment-summary')
export async function renderPaymentSummary(){
 
 await loadProductsFetch(); 
 let paymentSummaryMoney = 0;
 let shippingMoney = 0;
 
 cart.cart.forEach(element => {
   const quantity =  element.quantity;
   const matchingItem = products.find(p => p.id === element.productId);
   const optionShipping = deliveryOptions.find(option => option.id == element.deliveryOptionId);
   shippingMoney += optionShipping.priceCents;
   paymentSummaryMoney += matchingItem.priceCents * quantity;
  });
  
  
  const beforeTax = shippingMoney + paymentSummaryMoney;
  
  const totalTax = beforeTax * 0.1;
  
  totalCostCents = beforeTax + totalTax;
     paymentSummary.innerHTML = generateHtmlPaymentSummary( {
     itemsNumber:   cart.counter(),
     paymentSummaryMoney, 
     shippingMoney, 
     beforeTax,
     totalTax, 
     total: totalCostCents
   } )

//   document.querySelector('.js-place-order-button').addEventListener('click', async (evnet)  =>{
//     try{

//       console.log(cart.cart)
//       const response = await fetch('https://supersimplebackend.dev/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         cart: cart.cart // This ensures the key "cart" points directly to the array
//       }) 
//     }) 
//     const order = await response.json();
//     console.log(order);
//   }catch(error){
//    console.error(error)
//   }
// })

document.querySelector('.js-place-order-button')
  .addEventListener('click', async () => {
    try {
    //   const response = await fetch('https://supersimplebackend.dev/orders', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ cart: cart.cart })   
    //   });

    //   const order = await response.json();
      
    //   // This is where the magic happens! 
    //   // It takes that backend object and saves it locally.
    //   //addOrder(order);
    //   console.log(order);
    //   
    if(cart.cart.length === 0)
    throw new Error(cart.cart);
    await generateLocalOrder(cart.cart,totalCostCents);
    cart.reset();
    window.location.href = 'orders.html';
    // Redirect to the orders page after saving
    } catch (error) {
      console.log('Error placing order. Try again later.');
    }
});
}
