import { cart, addToCart,loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () =>{
  it ('adds an existing prodcut to the cart ', () =>{
    spyOn(localStorage,'setItem');
    //addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    spyOn(localStorage,'getItem').and.callFake(()=> JSON.stringify([{
      id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1,
      deliveryOptionId:1
    }]))
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1)
    expect(cart.length).toEqual(1)
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0]).toEqual({  
      id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId:1
    })
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].quantity).toEqual(2)
  })
  it ('adds a new product to the cart', () =>{

    spyOn (localStorage,'setItem')
    spyOn (localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    })

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1)
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
  it('calls with cart []', ()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=> JSON.stringify([]))
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',2);
    expect(localStorage.setItem).not.toHaveBeenCalledWith('cart','[]');
    //expect(localStorage.setItem).toHaveBeenCalledWith('cart',`[{"id":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":7,"deliveryOptionId":1},{"id":"15b6fc6f-327a-4ec4-896f-486349e85a3d","quantity":15,"deliveryOptionId":1}]' ].`);
  })
})