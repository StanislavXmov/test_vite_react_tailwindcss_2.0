export type User = {
	id: string;
	name: string;
};

export async function searchUsers(query: string): Promise<User[]> {
	const response = await fetch(
		`/api/users?search=${encodeURIComponent(query)}`,
	);

	if (!response.ok) {
		throw new Error("Failed to search users");
	}

	return response.json();
}

export async function createUser(name: string, email: string): Promise<User> {
	const response = await fetch("/api/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
			email,
		}),
	});

	if (!response.ok) {
		throw new Error("Failed to create user");
	}
	return response.json();
}
