import { orders } from './data/orders.js';
import { addToCart ,counterCart } from './data/cart.js';
import {  loadProductsFetch } from './data/products.js';
import renderOrderProducts from './generateHtml/order.js' // To get product names/images
import { formatCurrency } from './util/money.js';
import {searchBar,searchBtn} from "./util/searchBar.js";
import { headerActive } from './util/header-responsive.js';
import './image-profile.js';


render();
async function render() {
  headerActive();
  if (orders.length === 0) {
  document.querySelector('.js-orders-grid').innerHTML = `
  <p style='text-align:center; color:red'>You haven't placed any orders yet.</p>
  <a href="index.html" class="continue-shopping-button button-primary">Continue Shopping</a>
  `;
  document.querySelector('.cart-quantity').innerHTML =  counterCart();
  return;
  }

  let products = await loadProductsFetch();
  
  function renderOrdersPage() {
    document.querySelector('.cart-quantity').innerHTML =  counterCart();
    let ordersHTML = '';
    
    orders.forEach((order) => {
    const orderDate = new Date(order.orderTime).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    ordersHTML += `
    <div class="order-container">
    <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${formatCurrency(order.totalCostCents)}</div>
            </div>
            </div>
            <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
            </div>
            </div>
            
            <div class="order-details-grid">
            ${renderOrderProducts(order,products)}
            </div>
            </div>
            `;
  });
  
  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
  
  // Add Interactivity
  setupEventListeners();
}

// Sub-function to generate the list of products inside each order

function setupEventListeners() {
  // Buy Again Interactivity
  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      addToCart(productId, 1);
      location.href = `checkout.html`
      // You can call your addToCart(productId, 1) function here
    });
  });

  // Track Package Interactivity
  document.querySelectorAll('.js-track-package').forEach((button) => {
    button.addEventListener('click', () => {
      const { orderId, productId } = button.dataset;
      window.location.href = `tracking.html?OrderId=${orderId}&ProductId=${productId}`
      // You could redirect to a tracking page here
    });
  });
}

// Initial Run
renderOrdersPage();




}
searchBar();
searchBtn();