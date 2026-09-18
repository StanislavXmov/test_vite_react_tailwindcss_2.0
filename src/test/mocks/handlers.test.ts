import { describe, expect, it } from "vitest";

describe("API mocks", () => {
	it("returns a mocked profile", async () => {
		const response = await fetch("http://localhost/api/profile");
		const profile: unknown = await response.json();

		expect(response.ok).toBe(true);
		expect(profile).toEqual({ id: 1, name: "Jane Doe" });
	});
});
