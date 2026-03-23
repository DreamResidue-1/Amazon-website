import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import products from "../../data/products.js";
describe('test suite: orderSummary', ()=>{
  it ('Displays the cart', ()=>{
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    spyOn (localStorage,'setItem')
    spyOn (localStorage,'getItem').and.callFake(
      ()=> JSON.stringify([{id: productId1
                          ,quantity:5,
                          deliveryOptionId:1},
                        {id: productId2
                          ,quantity:15,
                          deliveryOptionId:1}])
    )
    renderOrderSummary();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2)
    expect(document.querySelector('.js-quantity-label-'+productId1).textContent).
    toEqual('5')
        expect(document.querySelector('.js-quantity-label-'+productId2).textContent).
    toEqual('15')

    console.log(products.find(p=> p.id === productId1))
  });

  it('removes from cart', ()=>{
     const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    spyOn (localStorage,'setItem')
    spyOn (localStorage,'getItem').and.callFake(
      ()=> JSON.stringify([{id: productId1
                          ,quantity:5,
                          deliveryOptionId:1},
                        {id: productId2
                          ,quantity:15,
                          deliveryOptionId:1}])
    )
    renderOrderSummary();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2)
    expect(document.querySelector('.js-quantity-label-'+productId1).textContent).
    toEqual('5')
        expect(document.querySelector('.js-quantity-label-'+productId2).textContent).
    toEqual('15')
    document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

  })
})