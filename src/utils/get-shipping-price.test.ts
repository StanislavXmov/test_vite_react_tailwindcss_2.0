import { describe, expect, it } from "vitest";
import { getShippingPrice } from "./get-shipping-price";

type Order = [
	orderTotal: number,
	country: "US" | "DE" | "PY",
	isPremium: boolean,
	expected: number,
];

const testData: Order[] = [
	[50, "US", false, 10],
	[50, "DE", false, 15],
	[50, "PY", false, 20],
	[100, "US", false, 0],
	[110, "DE", false, 0],
	[115, "PY", false, 0],
	[60, "US", true, 0],
	[60, "DE", true, 0],
	[60, "PY", true, 0],
];

describe("getShippingPrice", () => {
	it.each(testData)(
		"returns shipping price",
		(orderTotal, country, isPremium, expected) => {
			expect(getShippingPrice(orderTotal, country, isPremium)).toBe(expected);
		},
	);
	it("Order total cannot be negative", () => {
		expect(() => getShippingPrice(-10, "US", false)).toThrow(
			"Order total cannot be negative",
		);
	});
});
