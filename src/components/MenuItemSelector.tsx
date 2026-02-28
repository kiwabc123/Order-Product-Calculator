import { useState } from 'react';
import { MenuItem } from '../models/MenuItem';
import { MenuPrices } from '../constants/MenuPrices';
import './MenuItemSelector.css';

interface MenuItemSelectorProps {
  onAddItem: (item: MenuItem, quantity: number) => void;
}

export default function MenuItemSelector({ onAddItem }: MenuItemSelectorProps) {
  const items = Object.values(MenuItem);

  const handleAddItem = (item: MenuItem, quantity: number) => {
    if (quantity > 0) {
      onAddItem(item, quantity);
    }
  };

  return (
    <div className="menu-item-selector">
      <h2>Select Items</h2>
      <div className="menu-grid">
        {items.map(item => (
          <MenuItemCard
            key={item}
            item={item}
            price={MenuPrices[item]}
            onAddItem={handleAddItem}
          />
        ))}
      </div>
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
  price: number;
  onAddItem: (item: MenuItem, quantity: number) => void;
}

function MenuItemCard({ item, price, onAddItem }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="menu-item-card">
      <div className="item-color-circle" style={{ backgroundColor: item.toLowerCase() }}>
        <span className="item-emoji">🎨</span>
      </div>
      <h3>{item}</h3>
      <p className="item-price">${price}</p>
      <div className="quantity-control">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        />
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button className="add-btn" onClick={() => onAddItem(item, quantity)}>
        Add to Cart
      </button>
    </div>
  );
}
