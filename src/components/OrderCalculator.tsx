import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePriceCalculation, useOrderManagement } from '../hooks';
import MenuItemSelector from './MenuItemSelector';
import OrderSummary from './OrderSummary';
import PriceDisplay from './PriceDisplay';
import MemberToggle from './MemberToggle';
import './OrderCalculator.css';

export default function OrderCalculator() {
  const { order, addItem, updateItemQuantity, removeItem, clearOrder } = useOrderManagement();
  const { isMember, toggleMemberStatus, priceBreakdown, calculatePrice } = usePriceCalculation();

  // Recalculate price whenever order or membership status changes
  useEffect(() => {
    calculatePrice(order);
  }, [order, isMember, calculatePrice]);

  const handleCheckout = () => {
    const itemsList = order
      .map(item => `${item.item} × ${item.quantity}`)
      .join('<br>');

    Swal.fire({
      title: 'Order Confirmation',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <h4 style="margin-bottom: 15px;">Order Items:</h4>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            ${itemsList}
          </div>
          <div style="border-top: 2px solid #ddd; padding-top: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Subtotal:</span>
              <strong>$${priceBreakdown.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
            </div>
            ${priceBreakdown.itemDiscount > 0 ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #B35656;">
                <span>Item Discount:</span>
                <strong>-$${priceBreakdown.itemDiscount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
              </div>
            ` : ''}
            ${priceBreakdown.memberDiscount > 0 ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #B35656;">
                <span>Member Discount:</span>
                <strong>-$${priceBreakdown.memberDiscount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; font-size: 1.2em; font-weight: bold; color: #B35656;">
              <span>Total:</span>
              <span>$${priceBreakdown.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Complete Order',
      confirmButtonColor: '#B35656',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Order Placed! 🎉',
          text: `Your order of $${priceBreakdown.total.toLocaleString('en-US', { minimumFractionDigits: 2 })} has been successfully placed.`,
          icon: 'success',
          confirmButtonColor: '#B35656',
        }).then(() => {
          clearOrder();
        });
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: 'Clear Cart?',
      text: 'Are you sure you want to remove all items from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B35656',
      cancelButtonColor: '#666',
      confirmButtonText: 'Yes, Clear Cart',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        clearOrder();
        Swal.fire({
          title: 'Cart Cleared',
          text: 'Your cart is now empty.',
          icon: 'info',
          confirmButtonColor: '#B35656',
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="order-calculator">
      <div className="calculator-left">
        <MenuItemSelector onAddItem={addItem} />
      </div>

      <div className="calculator-right">
        <MemberToggle isMember={isMember} onToggle={toggleMemberStatus} />
        <OrderSummary
          order={order}
          onUpdateQuantity={updateItemQuantity}
          onRemoveItem={removeItem}
        />
        <PriceDisplay priceBreakdown={priceBreakdown} />

        <div className="action-buttons">
          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
            disabled={order.length === 0}
          >
            💳 Checkout
          </button>
          <button
            className="clear-btn"
            onClick={handleClearCart}
            disabled={order.length === 0}
          >
            🔄 Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
