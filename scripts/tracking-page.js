import { orders } from "./data/orders.js";
import { loadProductsFetch } from "./data/products.js";
import { generateHtmlTracking } from "./generateHtml/tracking.js";
import { headerActive } from "./util/header-responsive.js";
import {searchBar,searchBtn} from "./util/searchBar.js";
import './image-profile.js';

const url = new URL(location.href);
const productId = url.searchParams.get('ProductId');
const orderId = url.searchParams.get('OrderId');
const order = orders.find(o => o.id === orderId);
const product = order.products.find(p => p.productId == productId);

// 1. Setup the time variables as Numbers (ms)
const currentTime = new Date().getTime();
const orderTime = new Date(order.orderTime).getTime();
const deliveryTime = new Date(product.estimatedDeliveryTime).getTime();
//  const today = new Date() .getTime();
//       const order = new Date(new Date().setTime(today + 7*24*60*60)).getTime();
//       const delivery = new Date(new Date().setTime(today - 3*24*60*60)) .getTime();

//   const onpercent = (order - delivery) / 100;
//   console.log(onpercent)
//   const passedTime = order - today;
//   console.log(passedTime/onpercent)

// 2. Calculate the progress percentage
const onePercent = (deliveryTime-orderTime) / 100;
console.log('this', onePercent);
const passedTime = currentTime - orderTime;
console.log(passedTime / onePercent)

// Formula: (Elapsed Time / Total Duration) * 100
let progress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

// 3. Constrain the progress between 0 and 100
progress = Math.min(Math.max(progress, 0), 100).toFixed(0);

// 4. Format the delivery date for display
const date = new Date(product.estimatedDeliveryTime);
const formattedDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
}).format(date);

// Log the results
console.log(`Progress: ${progress}%`);
console.log(`Progress: ${Math.round(passedTime / onePercent)}%`);
console.log('Current ISO:', new Date().toISOString());
console.log('Delivery Date:', formattedDate);


async function renderTrackingProducts() {
  headerActive();
  const productCollection = await loadProductsFetch();
  const matchingProduct = productCollection.find(p=> p.id === product.productId )
  document.querySelector('.main').innerHTML = generateHtmlTracking(product, matchingProduct);

  const  progressLabels = document.querySelectorAll('.progress-label');
  progressBar();
  setInterval( () => {
   progressBar();
  }, 5000 )
  
  
  function progressBar(){
      if(progress <= 33 && progress >= 0)
        progressLabels[0].classList.add('current-status')
      else if(progress <= 66 && progress > 33)
        progressLabels[1].classList.add('current-status')
      else 
        progressLabels[2].classList.add('current-status') 
  
      document.querySelector('.js-progress-bar').style.width = `${progress}%`;
  }
}


renderTrackingProducts();
searchBtn();
searchBar();