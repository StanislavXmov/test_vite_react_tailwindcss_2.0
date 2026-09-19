export function getShippingPrice(
	orderTotal: number,
	country: "US" | "DE" | "PY",
	isPremium: boolean,
): number {
	if (orderTotal < 0) {
		throw new Error("Order total cannot be negative");
	}

	if (isPremium) {
		return 0;
	}

	if (orderTotal >= 100) {
		return 0;
	}

	switch (country) {
		case "US":
			return 10;
		case "DE":
			return 15;
		case "PY":
			return 20;
	}
}
