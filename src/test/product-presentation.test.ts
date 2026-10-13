import { describe, expect, it } from "vitest";
import { deliveryWindow } from "@/lib/product-presentation";

describe("Foldit delivery window", () => {
  it("shows a delivery window of one to three days", () => {
    expect(deliveryWindow.minDays).toBe(1);
    expect(deliveryWindow.maxDays).toBe(3);
  });
});