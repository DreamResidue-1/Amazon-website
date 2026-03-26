


export function generateHtmlTracking(product, mattingProduct){

const date = new Date(product.estimatedDeliveryTime);
const formattedDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
}).format(date);

return`
  <div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${formattedDate}
    </div>

    <div class="product-info">
      ${mattingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${product.quantity}
    </div>

    <img class="product-image" src="${mattingProduct.image}">

    <div class="progress-labels-container js-progress-labels">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
  </div>`
}