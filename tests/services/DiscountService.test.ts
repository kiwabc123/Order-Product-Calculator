import { DiscountService } from "../../src/services/DiscountService";
import { MenuItem } from "../../src/models/MenuItem";

describe("DiscountService", () => {

  describe("applyItemDiscount", () => {
    it("should apply 5% discount for eligible items with even quantity", () => {
      const result = DiscountService.applyItemDiscount(
        MenuItem.Orange,
        2,
        100
      );
      expect(result).toBe(95);
    });

    it("should not apply discount for ineligible items", () => {
      const result = DiscountService.applyItemDiscount(
        MenuItem.Red,
        2,
        100
      );
      expect(result).toBe(100);
    });

    it("should not apply discount for odd quantities", () => {
      const result = DiscountService.applyItemDiscount(
        MenuItem.Orange,
        3,
        100
      );
      expect(result).toBe(100);
    });

    it("should apply discount for Pink with even quantity", () => {
      const result = DiscountService.applyItemDiscount(
        MenuItem.Pink,
        4,
        200
      );
      expect(result).toBe(190);
    });

    it("should apply discount for Green with even quantity", () => {
      const result = DiscountService.applyItemDiscount(
        MenuItem.Green,
        2,
        80
      );
      expect(result).toBe(76);
    });
  });

  describe("applyMemberDiscount", () => {
    it("should apply 10% discount for members", () => {
      const result = DiscountService.applyMemberDiscount(100, true);
      expect(result).toBe(90);
    });

    it("should not apply discount for non-members", () => {
      const result = DiscountService.applyMemberDiscount(100, false);
      expect(result).toBe(100);
    });
  });

  describe("getItemDiscountPercentage", () => {
    it("should return 5% for eligible items with even quantity", () => {
      const result = DiscountService.getItemDiscountPercentage(
        MenuItem.Orange,
        2
      );
      expect(result).toBe(5);
    });

    it("should return 0% for ineligible items", () => {
      const result = DiscountService.getItemDiscountPercentage(
        MenuItem.Blue,
        2
      );
      expect(result).toBe(0);
    });

    it("should return 0% for odd quantities", () => {
      const result = DiscountService.getItemDiscountPercentage(
        MenuItem.Pink,
        3
      );
      expect(result).toBe(0);
    });
  });

});
