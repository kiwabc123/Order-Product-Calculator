import { useState, useCallback } from 'react';
import { MenuItem } from '../models/MenuItem';
import { OrderItem } from '../services/PriceCalculator';

export function useOrderManagement() {
  const [order, setOrder] = useState<OrderItem[]>([]);

  const addItem = useCallback((item: MenuItem, quantity: number = 1) => {
    setOrder(prev => {
      const existingItem = prev.find(o => o.item === item);
      if (existingItem) {
        return prev.map(o =>
          o.item === item
            ? { ...o, quantity: o.quantity + quantity }
            : o
        );
      }
      return [...prev, { item, quantity }];
    });
  }, []);

  const updateItemQuantity = useCallback((item: MenuItem, quantity: number) => {
    if (quantity <= 0) {
      removeItem(item);
      return;
    }
    setOrder(prev =>
      prev.map(o =>
        o.item === item ? { ...o, quantity } : o
      )
    );
  }, []);

  const removeItem = useCallback((item: MenuItem) => {
    setOrder(prev => prev.filter(o => o.item !== item));
  }, []);

  const clearOrder = useCallback(() => {
    setOrder([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return order.reduce((sum, item) => sum + item.quantity, 0);
  }, [order]);

  return {
    order,
    addItem,
    updateItemQuantity,
    removeItem,
    clearOrder,
    getTotalItems
  };
}
