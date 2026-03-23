
export function generateHtmlProduct(element) {
  return `
      <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${element.image}">
          </div>

          <div class="product-name limit-text-to-2-lines js-limit-text-to-2-lines">
            ${element.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${element.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${element.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${element.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class=${"select"+element.id}>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
              ${element.extraInfoHtml()}
          <div class="product-spacer"></div>

          <div class="added-to-cart added${element.id}" >
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-id="${element.id}">
            Add to Cart
          </button>
        </div>`
}

export default generateHtmlProduct;