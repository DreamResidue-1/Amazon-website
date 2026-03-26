
export function renderOrderProducts(order,products) {
  let productsHTML = '';
  order.products.forEach((orderItem) => {
    const product = products.find(p => p.id === orderItem.productId);
    const deliveryDate = new Date(orderItem.estimatedDeliveryTime).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

    productsHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
        </div>
        <div class="product-details">
        <div class="product-name">${product.name}</div>
        <div class="product-delivery-date">Arriving on: ${deliveryDate}</div>
        <div class="product-quantity">Quantity: ${orderItem.quantity}</div>
        <button class="buy-again-button button-primary js-buy-again" 
                data-product-id="${product.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
        </div>
        <div class="product-actions">
        <button class="track-package-button button-secondary js-track-package" 
                data-order-id="${order.id}" 
                data-product-id="${product.id}">
          Track package
          </button>
          </div>
    `;
  });
  
  return productsHTML;
}

export default renderOrderProducts;
