export const cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart)

function saveProduct(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(id, quantity){
  const product = cart.find(element => element.id === id);
  if(product){
    product.quantity+=quantity;
  }else {
    cart.push({id,quantity});
  }
  saveProduct();

}

export function counter() {
  let count = 0;
  cart.forEach(product => {
      count += product.quantity;
  })
  return count;
}

