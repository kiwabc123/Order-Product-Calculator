import { useState, useCallback } from 'react';
import { PriceCalculator, OrderItem } from '../services/PriceCalculator';

export interface PriceBreakdown {
  subtotal: number;
  itemDiscount: number;
  memberDiscount: number;
  total: number;
}

export function usePriceCalculation() {
  const [isMember, setIsMember] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown>({
    subtotal: 0,
    itemDiscount: 0,
    memberDiscount: 0,
    total: 0
  });

  const calculator = new PriceCalculator();

  const calculatePrice = useCallback((order: OrderItem[]) => {
    const breakdown = calculator.calculateWithBreakdown(order, isMember);
    setPriceBreakdown(breakdown);
    return breakdown;
  }, [isMember]);

  const toggleMemberStatus = useCallback(() => {
    setIsMember(prev => !prev);
  }, []);

  return {
    isMember,
    setIsMember,
    toggleMemberStatus,
    priceBreakdown,
    calculatePrice
  };
}
