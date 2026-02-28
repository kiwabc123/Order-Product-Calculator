import { MenuItem } from '../models/MenuItem';
import { MenuPrices } from '../constants/MenuPrices';
import { OrderItem } from '../services/PriceCalculator';
import { DiscountService } from '../services/DiscountService';
import './OrderSummary.css';

interface OrderSummaryProps {
  order: OrderItem[];
  onUpdateQuantity: (item: MenuItem, quantity: number) => void;
  onRemoveItem: (item: MenuItem) => void;
}

export default function OrderSummary({ order, onUpdateQuantity, onRemoveItem }: OrderSummaryProps) {
  if (order.length === 0) {
    return (
      <div className="order-summary empty">
        <p className="empty-message">🛒 Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="order-items">
        {order.map(orderItem => {
          const price = MenuPrices[orderItem.item];
          const subtotal = price * orderItem.quantity;
          const discountPercentage = DiscountService.getItemDiscountPercentage(
            orderItem.item,
            orderItem.quantity
          );
          const discountedSubtotal = DiscountService.applyItemDiscount(
            orderItem.item,
            orderItem.quantity,
            subtotal
          );

          return (
            <div key={orderItem.item} className="order-item">
              <div className="item-info">
                <span className="item-name">{orderItem.item}</span>
                <span className="item-details">
                  ${price} × {orderItem.quantity}
                </span>
              </div>

              <div className="item-pricing">
                {discountPercentage > 0 && (
                  <span className="discount-badge">-{discountPercentage}%</span>
                )}
                <div className="price-column">
                  {discountPercentage > 0 && (
                    <span className="subtotal">${subtotal.toFixed(2)}</span>
                  )}
                  <span className="discounted-subtotal">${discountedSubtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="item-controls">
                <button
                  className="qty-btn"
                  onClick={() => onUpdateQuantity(orderItem.item, orderItem.quantity - 1)}
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={orderItem.quantity}
                  onChange={e => {
                    const newQty = parseInt(e.target.value);
                    if (newQty > 0) onUpdateQuantity(orderItem.item, newQty);
                  }}
                  className="qty-input"
                />
                <button
                  className="qty-btn"
                  onClick={() => onUpdateQuantity(orderItem.item, orderItem.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(orderItem.item)}
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
