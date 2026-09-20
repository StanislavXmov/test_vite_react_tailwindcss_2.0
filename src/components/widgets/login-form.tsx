import { useState } from "react";

type Props = {
	onSubmit: (email: string, password: string) => Promise<void>;
};

export function LoginForm({ onSubmit }: Props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!email || !password) {
			setError("Email and password are required");
			return;
		}

		setError("");
		setIsLoading(true);

		try {
			await onSubmit(email, password);
		} catch {
			setError("Invalid email or password");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Email
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>

			<label>
				Password
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>

			{error && <div role="alert">{error}</div>}

			<button type="submit" disabled={isLoading}>
				{isLoading ? "Signing in..." : "Sign in"}
			</button>
		</form>
	);
}
