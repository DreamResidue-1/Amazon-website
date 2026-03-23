
const cart = {
  cartItem: undefined,

  loadFromStorage(){
    this.cartItem = JSON.parse(localStorage.getItem('cart-oop')) || [];
  },
  saveProduct(){
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItem));
  },
  addToCart(id, quantity){
    const product = this.cartItem.find(element => element.id === id);
    if(product){
      product.quantity+=quantity;
    }else {
      this.cartItem.push({id,quantity,deliveryOptionId:1});
    }
    this.saveProduct();
  },
  deleteFromCart(id){
    let newCart = this.cartItem.filter(cartItem => cartItem.id !== id);
    this.cartItem = newCart;
    this.saveProduct();
  },
  counter() {
    let count = 0;
    this.cartItem.forEach(product => {
      count += product.quantity;
    })
    return count;
  },

  updateFromCart(id, quantity) {
    let mattingItem = this.cartItem.find(cartItem => cartItem.id == id);
    mattingItem.quantity = quantity;
    this.saveProduct();
  },

  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem  = this.cartItem.find(cartItem => cartItem.id === productId)
    matchingItem.deliveryOptionId =  deliveryOptionId;
    this.saveProduct();
  }
}

cart.loadFromStorage();

console.log(cart);

