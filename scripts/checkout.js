
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js'
//import '../data/cart-class.js'
//import '../data/backend-practice.js'
import { headerActive } from './util/header-responsive.js';
import './image-profile.js'
function renderCheckout() {
  
  
 
  headerActive();
  
  renderPaymentSummary();
  
  renderOrderSummary();
  
}
renderCheckout();



