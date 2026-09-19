import { trackEvent } from "./analytics";

type Order = {
	id: string;
	total: number;
};

export async function createOrder(total: number): Promise<Order> {
	const response = await fetch("/api/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ total }),
	});

	if (!response.ok) {
		throw new Error("Failed to create order");
	}

	const order: Order = await response.json();

	trackEvent("order_created", {
		orderId: order.id,
		total: order.total,
	});

	return order;
}
