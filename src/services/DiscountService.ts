import { MenuItem } from "../models/MenuItem";

export class DiscountService {

  static applyItemDiscount(
    item: MenuItem,
    quantity: number,
    subtotal: number
  ): number {

    const eligibleItems = [
      MenuItem.Orange,
      MenuItem.Pink,
      MenuItem.Green
    ];

    if (eligibleItems.includes(item) && quantity % 2 === 0) {
      return subtotal * 0.95;
    }

    return subtotal;
  }

  static applyMemberDiscount(total: number, isMember: boolean): number {
    if (isMember) {
      return total * 0.9;
    }
    return total;
  }

  static getItemDiscountPercentage(item: MenuItem, quantity: number): number {
    const eligibleItems = [
      MenuItem.Orange,
      MenuItem.Pink,
      MenuItem.Green
    ];

    if (eligibleItems.includes(item) && quantity % 2 === 0) {
      return 5;
    }

    return 0;
  }
}
