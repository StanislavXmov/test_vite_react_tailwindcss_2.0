import { HttpResponse, http } from "msw";

export const handlers = [
	http.get("/api/profile", () => {
		return HttpResponse.json({
			id: 1,
			name: "Jane Doe",
		});
	}),
	http.get("/api/users", async ({ request }) => {
		const url = new URL(request.url);
		const search = url.searchParams.get("search");

		if (!search) {
			return HttpResponse.json(
				{ message: "search is required" },
				{ status: 400 },
			);
		}

		if (search === "ali") {
			return HttpResponse.json([
				{ id: "1", name: "Alice" },
				{ id: "2", name: "Bob" },
			]);
		}

		return HttpResponse.json([]);
	}),
];
