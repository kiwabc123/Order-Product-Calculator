import { PriceCalculator } from "../../src/services/PriceCalculator";
import { MenuItem } from "../../src/models/MenuItem";

describe("PriceCalculator", () => {

  const calculator = new PriceCalculator();

  it("should calculate normal order correctly", () => {
    const total = calculator.calculate([
      { item: MenuItem.Red, quantity: 1 }
    ], false);

    expect(total).toBe(50);
  });

  it("should apply even item discount (5%)", () => {
    const total = calculator.calculate([
      { item: MenuItem.Orange, quantity: 2 }
    ], false);

    // 120*2=240 → 5% discount → 228
    expect(total).toBe(228);
  });

  it("should apply member discount (10%)", () => {
    const total = calculator.calculate([
      { item: MenuItem.Red, quantity: 2 }
    ], true);

    // 100 → 90
    expect(total).toBe(90);
  });

  it("should apply both discounts", () => {
    const total = calculator.calculate([
      { item: MenuItem.Pink, quantity: 2 }
    ], true);

    // 80*2=160
    // even discount → 152
    // member 10% → 136.8
    expect(total).toBe(136.8);
  });

  it("should calculate multiple items correctly", () => {
    const total = calculator.calculate([
      { item: MenuItem.Green, quantity: 2 },
      { item: MenuItem.Red, quantity: 1 }
    ], false);

    // Green: 40*2=80 → 5% discount → 76
    // Red: 50*1=50
    // Total: 126
    expect(total).toBe(126);
  });

  it("should calculate breakdown correctly", () => {
    const breakdown = calculator.calculateWithBreakdown([
      { item: MenuItem.Orange, quantity: 2 }
    ], false);

    expect(breakdown.subtotal).toBe(228);
    expect(breakdown.itemDiscount).toBe(12);
    expect(breakdown.memberDiscount).toBe(0);
    expect(breakdown.total).toBe(228);
  });

  it("should handle empty order", () => {
    const total = calculator.calculate([], false);
    expect(total).toBe(0);
  });

  describe("test Scenarios", () => {
    // Desk#1: Customers order Red set and Green set; price from calculation is 90
    it("should calculate Red + Green order correctly (90 total)", () => {
      // Desk#1: Customer orders Red set ($50) and Green set ($40)
      const total = calculator.calculate([
        { item: MenuItem.Red, quantity: 1 },
        { item: MenuItem.Green, quantity: 1 }
      ], false);

      // Expected: 50 + 40 = 90 (no member discount)
      expect(total).toBe(90);
    });

    // Customers can use a 10% discount card, then price should be deducted by discount amount.
    it("should apply 10% member discount to Red + Green order", () => {
      // Desk#1: Customer orders Red set ($50) and Green set ($40)
      // Customer uses 10% discount card
      const total = calculator.calculate([
        { item: MenuItem.Red, quantity: 1 },
        { item: MenuItem.Green, quantity: 1 }
      ], true);

      // Expected: (50 + 40) * 0.9 = 90 * 0.9 = 81
      expect(total).toBe(81);
    });

    // For Orange sets, if customers order more than 2 items per bill. customers will get a 5% discount.
    it("should apply 5% item discount for Orange when quantity > 2", () => {
      // Orange set costs $120
      // Order 4 Orange sets = 120 * 4 = 480
      // Even quantity triggers 5% discount = 480 * 0.95 = 456
      const total = calculator.calculate([
        { item: MenuItem.Orange, quantity: 4 }
      ], false);

      expect(total).toBe(456);
    });

    // Problem statement #3: For Orange sets, if customers order more than 2 items per bill, customers will get a 5% discount
    it("should apply 5% item discount for Orange with 2 items (even quantity)", () => {
      // Orange set costs $120
      // Order 2 Orange sets = 120 * 2 = 240
      // Even quantity triggers 5% discount = 240 * 0.95 = 228
      const total = calculator.calculate([
        { item: MenuItem.Orange, quantity: 2 }
      ], false);

      expect(total).toBe(228);
    });

    it("should combine item discount (Orange) with member discount", () => {
      // Orange x2 = 120 * 2 = 240
      // Apply 5% item discount = 240 * 0.95 = 228
      // Apply 10% member discount = 228 * 0.9 = 205.2
      const total = calculator.calculate([
        { item: MenuItem.Orange, quantity: 2 }
      ], true);

      expect(total).toBe(205.2);
    });

    // Problem statement #1: Customer orders Red set and Green set; price from calculation is 90
    it("should calculate detailed breakdown for Desk#1", () => {
      // Red ($50) + Green ($40) = 90
      // Green is eligible for 5% discount with qty 1? No, needs even qty
      // So: subtotal = 50 + 40 = 90
      const breakdown = calculator.calculateWithBreakdown([
        { item: MenuItem.Red, quantity: 1 },
        { item: MenuItem.Green, quantity: 1 }
      ], false);

      expect(breakdown.subtotal).toBe(90);
      expect(breakdown.itemDiscount).toBe(0);
      expect(breakdown.memberDiscount).toBe(0);
      expect(breakdown.total).toBe(90);
    });

    // Problem statement #2: Customer can use a 10% discount card, then price should be deducted by discount amount
    it("should calculate detailed breakdown with member discount for Desk#1", () => {
      // Red ($50) + Green ($40) = 90
      // Member discount = 10% = 9
      const breakdown = calculator.calculateWithBreakdown([
        { item: MenuItem.Red, quantity: 1 },
        { item: MenuItem.Green, quantity: 1 }
      ], true);

      expect(breakdown.subtotal).toBe(90);
      expect(breakdown.itemDiscount).toBe(0);
      expect(breakdown.memberDiscount).toBe(9);
      expect(breakdown.total).toBe(81);
    });
  });

});
