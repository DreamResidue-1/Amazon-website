import * as cart from '../../data/cart.js';
import { generateHtmlCartItem } from '../generateHtml/cartItem.js';
import { renderPaymentSummary } from './paymentSummary.js';

const orderSummary = document.querySelector('.js-order-summary');
export function renderOrderSummary() {
  cart.loadFromStorage();
  orderSummary.innerHTML = 
  cart.cart.map(order => {
    return generateHtmlCartItem(order);
  }).join('');
  
  renderPaymentSummary();
  returnToHomeLink();
}

if(orderSummary)
orderSummary.addEventListener('click', event => {
    const targeted = event.target;
    if(targeted.closest('.js-delete-quantity-link')){
    let productId = targeted.dataset.productId;
    cart.deleteFromCart(productId);
    renderPaymentSummary();
    renderOrderSummary(); 
    }

    else if(targeted.closest(`.js-update-quantity-link`)){
    let productQuantity = targeted.closest('.product-quantity')
    let productId = targeted.closest('.js-product-quantity').dataset.productId;
    let currentQuantity = document.querySelector('.js-quantity-label-'+productId);
    let input = document.querySelector('.js-update-input-'+productId);
    if(!productQuantity.classList.contains('active-save')){
      input.value = currentQuantity.textContent; 
      input.addEventListener("input", () => {
        // Base width of 50px + 8px per character
        const newWidth = 20 + (input.value.length * 8);
        input.style.width = `${newWidth}px`;
      });
      productQuantity.classList.add('active-save');      
    }else{
      productQuantity.classList.remove('active-save');
      currentQuantity.textContent = !input.value || input.value < 1 ? '1' : input.value;
      cart.updateFromCart(productId,+currentQuantity.textContent);
      renderPaymentSummary();
      renderOrderSummary(); 
    }

    }
    else if(targeted.closest('.js-delivery-option')){
      let deliveryOption = targeted.closest('.js-delivery-option');
      const {productId, deliveryOptionId} = deliveryOption.dataset;
      cart.updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary(); 
    }
  })

function returnToHomeLink(){
  let count = +cart.counter();
  document.querySelector('.js-return-to-home-link').innerHTML = count > 1 ? `${count} items`: `${count} item`
}