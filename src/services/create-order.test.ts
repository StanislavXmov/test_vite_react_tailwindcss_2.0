import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "./analytics";
import { createOrder } from "./create-order";

function mockSuccessfulFetch(order: { id: string; total: number }) {
	// vi.stubGlobal(
	// 	"fetch",
	// 	vi.fn().mockResolvedValue({
	// 		ok: true,
	// 		json: vi.fn().mockResolvedValue(order),
	// 	}),
	// );

	const fetchMock = vi.fn().mockResolvedValue({
		ok: true,
		json: vi.fn().mockResolvedValue(order),
	});

	vi.stubGlobal("fetch", fetchMock);

	return fetchMock;
}

vi.mock("./analytics", () => {
	return {
		trackEvent: vi.fn(),
	};
});

describe("createOrder", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("sends order creation request", async () => {
		const order = {
			id: "10",
			total: 100,
		};
		const total = 100;
		const fetchMock = mockSuccessfulFetch(order);

		await createOrder(total);
		expect(fetchMock).toHaveBeenCalledWith("/api/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ total }),
		});
	});

	it("returns created order", async () => {
		const order = {
			id: "10",
			total: 100,
		};
		mockSuccessfulFetch(order);

		const result = await createOrder(100);
		expect(result).toEqual(order);
	});

	it("tracks order after successful creation", async () => {
		const order = {
			id: "10",
			total: 100,
		};
		mockSuccessfulFetch(order);

		await createOrder(100);
		expect(trackEvent).toHaveBeenCalledOnce();
		expect(trackEvent).toHaveBeenCalledWith("order_created", {
			orderId: order.id,
			total: order.total,
		});
	});

	it("throws and does not track event when request fails", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: false,
				status: 500,
			}),
		);

		await expect(createOrder(42)).rejects.toThrow("Failed to create order");
		expect(trackEvent).not.toHaveBeenCalled();
	});
});
