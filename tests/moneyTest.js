import { formatCurrency } from "../scripts/util/money.js";

console.log('Test suite: formatCurrency');
console.log('converts form cents to dollar')
if(formatCurrency(1000) === '$10.00'){
  console.log('passed');
}else  {
  console.log('failed');
}

console.log('words with 0')

if(formatCurrency(0) === '$0.00'){
  console.log('passed');
}else  {
  console.log('failed');
}

console.log('the code rounds up to the nearest cents')
if(formatCurrency(1000.4) === '$10.00'){
  console.log('passed');
}else  {
  console.log('failed');
}