import deliveryOptions from '../../data/deliveryOptions.js';
import { formatCurrency } from '../util/money.js';
import { cart } from '../../data/cart.js';
/**
 * Calculates a delivery date string based on the number of days from today.
 * @param {number} daysToAdd 
 * @returns {string} - e.g., "Tuesday, June 21"
 */
export function getDeliveryDate(daysToAdd) {
  const today = new Date();
  const deliveryDate = new Date();
  
  // Add the days to the current date
  deliveryDate.setDate(today.getDate() + daysToAdd);

  // Format the date to "Weekday, Month Day"

  const DeliveryDate  = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  if(DeliveryDate.toUpperCase().includes('FRIDAY')){
    return getDeliveryDate(daysToAdd+1);
  }else{
    return DeliveryDate;
  }
}


export function generateHtmlDeliveryOption(deliveryOption, cartItem) {
  // Example: If the deliveryOption.id is '1' (which we'll assume is Free Shipping)
  let matchingItem = cart.find(item => item.id === cartItem.id)
  const isChecked = deliveryOption.id == matchingItem.deliveryOptionId?
   'checked' : '';
  const priceCents = deliveryOption.priceCents === 0 ? "Free ":
   formatCurrency(deliveryOption.priceCents) + ' -' ;

  return `
    <div class="delivery-option js-delivery-option" 
    data-product-id=${cartItem.id} 
    data-delivery-option-id=${deliveryOption.id}>
      <input type="radio" 
        ${isChecked} 
        class="delivery-option-input"
        name="delivery-option-${cartItem.id}">
      <div>
        <div class="delivery-option-date">
          ${getDeliveryDate(deliveryOption.days)}
        </div>
        <div class="delivery-option-price">
          ${priceCents} Shipping
        </div>
      </div>
    </div>
  `
}

export default generateHtmlDeliveryOption;