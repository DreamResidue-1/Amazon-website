import * as cart from '../../data/cart.js';
import { formatCurrency } from '../util/money.js';
import products from '../../data/products.js';
import deliveryOptions from '../../data/deliveryOptions.js';
import { generateHtmlPaymentSummary } from '../generateHtml/paymentSummary.js';

export function renderPaymentSummary(){
 
  
 let paymentSummaryMoney = 0;
 let shippingMoney = 0;
 cart.cart.forEach(element => {
   const quantity =  element.quantity;
   const matchingItem = products.find(p => p.id === element.id);
   const optionShipping = deliveryOptions.find(option => option.id == element.deliveryOptionId);
   shippingMoney += optionShipping.priceCents;
   paymentSummaryMoney += matchingItem.priceCents * quantity;
  });
  
  
  const beforeTax = shippingMoney + paymentSummaryMoney;
  
  const totalTax = beforeTax * 0.1;
  
  const total = beforeTax + totalTax;
     document.querySelector('.js-payment-summary').innerHTML = generateHtmlPaymentSummary( {
     itemsNumber:   cart.counter(),
     paymentSummaryMoney, 
     shippingMoney, 
     beforeTax,
     totalTax, 
     total
   } )

} 
