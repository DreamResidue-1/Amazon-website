import { formatCurrency } from "../../scripts/util/money.js";

describe('Test suite: foramtCurrency', () =>{
  it ('converts price cents to dollars ', ()=>{
    expect(formatCurrency(200)).toEqual('$2.00')
  })
  it('works with 0', ()=>{
    expect(formatCurrency(0)).toEqual('$0.00')
  })
  it('rounds up to nearest cents', () =>{
    expect(formatCurrency(200.5)).toEqual('$2.01');
  })

  it('rounds down to nearest cents', ()=>{
    expect(formatCurrency(200.4)).toEqual('$2.00')
  })

  it('works with negitive number', ()=>{
    expect(formatCurrency(-200)).toEqual('$-2.00')
  })
})