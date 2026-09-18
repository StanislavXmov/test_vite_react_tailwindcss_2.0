import { HttpResponse, http } from "msw";

export const handlers = [
	http.get("*/api/profile", () => {
		return HttpResponse.json({
			id: 1,
			name: "Jane Doe",
		});
	}),
];
