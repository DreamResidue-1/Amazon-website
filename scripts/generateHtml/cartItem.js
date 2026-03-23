

import products from '../../data/products.js';
import {generateHtmlDeliveryOption} from './deliveryOptions.js';
import deliveryOptions from '../../data/deliveryOptions.js';
import { getDeliveryDate } from './deliveryOptions.js';

export function generateHtmlCartItem(order) {
  let matchingItem = products.find(e => e.id === order.id);
  let option =  deliveryOptions.find( option => option.id == order.deliveryOptionId)
  return `
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: ${getDeliveryDate(option.days) }
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            ${matchingItem.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity" data-product-id=${matchingItem.id}>
            <span>
              Quantity: <span class="quantity-label js-quantity-label js-quantity-label-${matchingItem.id}">${order.quantity}</span>
              <input type="number" class="update-input js-update-input-${matchingItem.id}">
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" >
              Update 
            </span>
            <span class="save-quantity-link link-primary js-update-quantity-link" >
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link js-delete-quantity-link-${matchingItem.id}" data-product-id=${matchingItem.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
           ${ deliveryOptions.map( deliveryOption=> generateHtmlDeliveryOption(deliveryOption,matchingItem)).join('') }
        </div>
      </div>
    </div>`
}
