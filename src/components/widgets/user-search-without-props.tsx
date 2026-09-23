import { useState } from "react";
import { searchUsers } from "@/services/users-api";

type User = {
	id: string;
	name: string;
};

export function UserSearchWithoutProps() {
	const [query, setQuery] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);
	const [searched, setSearched] = useState(false);
	const [error, setError] = useState("");

	async function handleSearch() {
		setLoading(true);
		setError("");

		try {
			const result = await searchUsers(query);

			setUsers(result);
			setSearched(true);
		} catch {
			setError("Failed to search users");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<label>
				Search users
				<input value={query} onChange={(e) => setQuery(e.target.value)} />
			</label>

			<button type="button" onClick={handleSearch}>
				Search
			</button>

			{loading && <div role="status">Searching...</div>}

			{error && <div role="alert">{error}</div>}

			{searched && users.length === 0 && <div>No users found</div>}

			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
}
