import { useState } from "react";
import { createUser } from "@/services/users-api";

export function CreateUserForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!name || !email) {
			setError("Name and email are required");
			return;
		}

		setLoading(true);
		setError("");
		setSuccessMessage("");

		try {
			const user = await createUser(name, email);

			setSuccessMessage(`User ${user.name} created`);
			setName("");
			setEmail("");
		} catch {
			setError("Failed to create user");
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Name
				<input value={name} onChange={(e) => setName(e.target.value)} />
			</label>

			<label>
				Email
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>

			{error && <div role="alert">{error}</div>}

			{successMessage && <div role="status">{successMessage}</div>}

			<button type="submit" disabled={loading}>
				{loading ? "Creating..." : "Create user"}
			</button>
		</form>
	);
}
