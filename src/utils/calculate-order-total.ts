type CartItem = {
	id: string;
	price: number;
	quantity: number;
};

type Discount = {
	type: "percentage" | "fixed";
	value: number;
};

export function calculateOrderTotal(
	items: CartItem[],
	discount?: Discount,
): number {
	const totalPrice = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);
	if (discount?.type === "percentage") {
		const price = totalPrice - totalPrice * (discount.value / 100);
		return price < 0 ? 0 : price;
	} else if (discount?.type === "fixed") {
		const price = totalPrice - discount.value;
		return price < 0 ? 0 : price;
	} else {
		return totalPrice;
	}
}
