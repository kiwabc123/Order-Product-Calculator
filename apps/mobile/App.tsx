import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { MenuItem, MenuPrices, PriceCalculator, DiscountService, OrderItem } from '@order-calculator/shared';

const priceCalculator = new PriceCalculator();

const menuItems = Object.values(MenuItem);

const menuColors: Record<MenuItem, string> = {
  [MenuItem.Red]: '#E57373',
  [MenuItem.Green]: '#81C784',
  [MenuItem.Blue]: '#64B5F6',
  [MenuItem.Yellow]: '#FFD54F',
  [MenuItem.Pink]: '#F48FB1',
  [MenuItem.Purple]: '#BA68C8',
  [MenuItem.Orange]: '#FFB74D',
};

export default function App() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isMember, setIsMember] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item === item);
      if (existing) {
        return prev.map(i => 
          i.item === item ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item === item);
      if (existing && existing.quantity > 1) {
        return prev.map(i => 
          i.item === item ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter(i => i.item !== item);
    });
  };

  const clearCart = () => setCart([]);

  const breakdown = priceCalculator.calculateWithBreakdown(cart, isMember);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Order Calculator</Text>
        <TouchableOpacity 
          style={[styles.memberToggle, isMember && styles.memberActive]}
          onPress={() => setIsMember(!isMember)}
        >
          <Text style={styles.memberText}>
            {isMember ? '👑 Member' : 'Guest'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Menu Grid */}
      <ScrollView style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Menu</Text>
        <View style={styles.menuGrid}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.menuCard, { backgroundColor: menuColors[item] }]}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.menuName}>{item}</Text>
              <Text style={styles.menuPrice}>${MenuPrices[item]}</Text>
              {DiscountService.getItemDiscountPercentage(item, 2) > 0 && (
                <Text style={styles.discountBadge}>5% off (2+)</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Cart */}
        <Text style={styles.sectionTitle}>Cart ({cart.length})</Text>
        {cart.length === 0 ? (
          <Text style={styles.emptyCart}>Cart is empty</Text>
        ) : (
          <View style={styles.cartContainer}>
            {cart.map(({ item, quantity }) => (
              <View key={item} style={styles.cartItem}>
                <View style={[styles.cartColor, { backgroundColor: menuColors[item] }]} />
                <Text style={styles.cartName}>{item}</Text>
                <Text style={styles.cartQty}>x{quantity}</Text>
                <Text style={styles.cartPrice}>
                  ${(MenuPrices[item] * quantity).toFixed(0)}
                </Text>
                <View style={styles.cartActions}>
                  <TouchableOpacity 
                    style={styles.cartBtn}
                    onPress={() => removeFromCart(item)}
                  >
                    <Text style={styles.cartBtnText}>−</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.cartBtn}
                    onPress={() => addToCart(item)}
                  >
                    <Text style={styles.cartBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Total */}
        {cart.length > 0 && (
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>${breakdown.subtotal.toFixed(2)}</Text>
            </View>
            {breakdown.itemDiscount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.discountLabel}>Item Discount (5%)</Text>
                <Text style={styles.discountValue}>-${breakdown.itemDiscount.toFixed(2)}</Text>
              </View>
            )}
            {breakdown.memberDiscount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.discountLabel}>Member Discount (10%)</Text>
                <Text style={styles.discountValue}>-${breakdown.memberDiscount.toFixed(2)}</Text>
              </View>
            )}
            <View style={[styles.totalRow, styles.totalFinal]}>
              <Text style={styles.totalFinalLabel}>Total</Text>
              <Text style={styles.totalFinalValue}>${breakdown.total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>💳 Checkout</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
              <Text style={styles.clearText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#16213e',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  memberToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  memberActive: {
    backgroundColor: '#B35656',
  },
  memberText: {
    color: '#fff',
    fontSize: 14,
  },
  menuContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  menuCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuPrice: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  discountBadge: {
    fontSize: 10,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  emptyCart: {
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  cartContainer: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  cartColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  cartName: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  cartQty: {
    color: '#888',
    marginRight: 8,
  },
  cartPrice: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 12,
  },
  cartActions: {
    flexDirection: 'row',
  },
  cartBtn: {
    width: 28,
    height: 28,
    backgroundColor: '#333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  cartBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    color: '#888',
  },
  totalValue: {
    color: '#fff',
  },
  discountLabel: {
    color: '#81C784',
  },
  discountValue: {
    color: '#81C784',
  },
  totalFinal: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
    marginTop: 8,
  },
  totalFinalLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalFinalValue: {
    color: '#F6F09F',
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: '#B35656',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearBtn: {
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  clearText: {
    color: '#888',
  },
});
