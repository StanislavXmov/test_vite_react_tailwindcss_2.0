import { useState } from "react";

type User = {
	id: string;
	name: string;
};

type Props = {
	searchUsers: (query: string) => Promise<User[]>;
};

export function UserSearch({ searchUsers }: Props) {
	const [query, setQuery] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);
	const [searched, setSearched] = useState(false);

	async function handleSearch() {
		setLoading(true);

		const result = await searchUsers(query);

		setUsers(result);
		setSearched(true);
		setLoading(false);
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

			{searched && users.length === 0 && <div>No users found</div>}

			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
}
