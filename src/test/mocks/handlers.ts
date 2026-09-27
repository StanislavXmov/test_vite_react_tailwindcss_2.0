import { HttpResponse, http } from "msw";

interface CreateUserDto {
	name: string;
	email: string;
}

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

	http.post<never, CreateUserDto>("/api/users", async ({ request }) => {
		const body = await request.json();

		if (body.name === "Alice" && body.email === "alice@example.com") {
			return HttpResponse.json({
				id: "1",
				name: body.name,
				email: body.email,
			});
		}

		return HttpResponse.json(
			{ message: "Invalid request body" },
			{ status: 400 },
		);
	}),
];
