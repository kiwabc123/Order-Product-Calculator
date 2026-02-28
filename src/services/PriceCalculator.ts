import { MenuItem } from "../models/MenuItem";
import { MenuPrices } from "../constants/MenuPrices";
import { DiscountService } from "./DiscountService";

export interface OrderItem {
  item: MenuItem;
  quantity: number;
}

export class PriceCalculator {

  calculate(order: OrderItem[], isMember: boolean): number {

    let total = 0;

    for (const orderItem of order) {
      const price = MenuPrices[orderItem.item];
      const subtotal = price * orderItem.quantity;

      const discountedSubtotal =
        DiscountService.applyItemDiscount(
          orderItem.item,
          orderItem.quantity,
          subtotal
        );

      total += discountedSubtotal;
    }

    total = DiscountService.applyMemberDiscount(total, isMember);

    return Number(total.toFixed(2));
  }

  calculateWithBreakdown(order: OrderItem[], isMember: boolean): {
    subtotal: number;
    itemDiscount: number;
    memberDiscount: number;
    total: number;
  } {
    let subtotal = 0;
    let itemDiscount = 0;

    for (const orderItem of order) {
      const price = MenuPrices[orderItem.item];
      const lineSubtotal = price * orderItem.quantity;
      const discountedSubtotal = DiscountService.applyItemDiscount(
        orderItem.item,
        orderItem.quantity,
        lineSubtotal
      );

      itemDiscount += lineSubtotal - discountedSubtotal;
      subtotal += discountedSubtotal;
    }

    const memberDiscount = isMember ? subtotal * 0.1 : 0;
    const total = Number((subtotal - memberDiscount).toFixed(2));

    return {
      subtotal: Number(subtotal.toFixed(2)),
      itemDiscount: Number(itemDiscount.toFixed(2)),
      memberDiscount: Number(memberDiscount.toFixed(2)),
      total
    };
  }
}
