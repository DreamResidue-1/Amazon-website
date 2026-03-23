

class Cart{
  cartItem;
  #localStorageKey;
  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage(){
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  };
  saveProduct(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
  };
  addToCart(id, quantity){
    const product = this.cartItem.find(element => element.id === id);
    if(product){
      product.quantity+=quantity;
    }else {
      this.cartItem.push({id,quantity,deliveryOptionId:1});
    }
    this.saveProduct();
  };
  deleteFromCart(id){
    let newCart = this.cartItem.filter(cartItem => cartItem.id !== id);
    this.cartItem = newCart;
    this.saveProduct();
  };
  counter() {
    let count = 0;
    this.cartItem.forEach(product => {
      count += product.quantity;
    })
    return count;
  };

  updateFromCart(id, quantity) {
    let mattingItem = this.cartItem.find(cartItem => cartItem.id == id);
    mattingItem.quantity = quantity;
    this.saveProduct();
  };

  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem  = this.cartItem.find(cartItem => cartItem.id === productId)
    matchingItem.deliveryOptionId =  deliveryOptionId;
    this.saveProduct();
  }
}
const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');

console.log(businessCart instanceof Cart)
cart.loadFromStorage();

console.log(cart);

