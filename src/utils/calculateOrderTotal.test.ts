import { describe, expect, it } from "vitest";
import { calculateOrderTotal } from "./calculate-order-total";

const items = [
	{
		id: "0",
		price: 100,
		quantity: 2,
	},
	{
		id: "10",
		price: 200,
		quantity: 1,
	},
];

describe("calculateOrderTotal", () => {
	it("returns total price without discount", () => {
		expect(calculateOrderTotal(items)).toBe(400);
	});

	it("applies percentage discount", () => {
		expect(calculateOrderTotal(items, { type: "percentage", value: 20 })).toBe(
			320,
		);
	});
	it("does not return negative total when percentage discount exceeds 100%", () => {
		expect(
			calculateOrderTotal(items, {
				type: "percentage",
				value: 120,
			}),
		).toBe(0);
	});
	it("applies fixed discount", () => {
		expect(calculateOrderTotal(items, { type: "fixed", value: 100 })).toBe(300);
	});
	it("returns zero when fixed discount exceeds total", () => {
		expect(calculateOrderTotal(items, { type: "fixed", value: 500 })).toBe(0);
	});
	it("returns zero for an empty cart", () => {
		expect(calculateOrderTotal([], { type: "percentage", value: 50 })).toBe(0);
	});
});
