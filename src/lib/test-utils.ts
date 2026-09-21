export function createDeferred() {
	let resolve!: () => void;
	let reject!: (reason?: unknown) => void;

	const promise = new Promise<void>((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return {
		promise,
		resolve,
		reject,
	};
}
