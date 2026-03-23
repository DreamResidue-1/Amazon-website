
import { formatCurrency } from "../util/money.js"
export function generateHtmlPaymentSummary(payment){
  return  `
      <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (<div class="items-number"> ${payment.itemsNumber} </div>):</div>
            <div class="payment-summary-money ">${formatCurrency(payment.paymentSummaryMoney)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money ">${formatCurrency(payment.shippingMoney)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(payment.beforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(payment.totalTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(payment.total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
 `
}