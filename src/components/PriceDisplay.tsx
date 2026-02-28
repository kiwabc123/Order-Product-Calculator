import { PriceBreakdown } from '../hooks/usePriceCalculation';
import '../utils/formatters';
import './PriceDisplay.css';

interface PriceDisplayProps {
  priceBreakdown: PriceBreakdown;
}

function formatPrice(amount: number): string {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PriceDisplay({ priceBreakdown }: PriceDisplayProps) {
  return (
    <div className="price-display">
      <div className="price-item">
        <span className="price-label">Subtotal:</span>
        <span className="price-value">{formatPrice(priceBreakdown.subtotal)}</span>
      </div>

      {priceBreakdown.itemDiscount > 0 && (
        <div className="price-item discount">
          <span className="price-label discount-label">Item Discount (5%):</span>
          <span className="price-value discount-value">
            -{formatPrice(priceBreakdown.itemDiscount)}
          </span>
        </div>
      )}

      {priceBreakdown.memberDiscount > 0 && (
        <div className="price-item discount">
          <span className="price-label discount-label">Member Discount (10%):</span>
          <span className="price-value discount-value">
            -{formatPrice(priceBreakdown.memberDiscount)}
          </span>
        </div>
      )}

      <div className="price-item total">
        <span className="price-label total-label">Total:</span>
        <span className="price-value total-value">{formatPrice(priceBreakdown.total)}</span>
      </div>
    </div>
  );
}
