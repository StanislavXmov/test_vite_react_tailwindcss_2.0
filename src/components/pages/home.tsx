export function Home() {
	return (
		<div className="min-h-screen bg-linear-to-r from-blue-50 to-indigo-100">
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-16 md:py-24">
				<div className="flex flex-col items-center md:flex-row">
					<div className="mb-10 md:mb-0 md:w-1/2">
						<h1 className="font-bold text-4xl text-gray-900 leading-tight md:text-6xl">
							Welcome to <span className="text-indigo-600">Our Platform</span>
						</h1>
						<p className="mt-6 max-w-lg text-gray-600 text-xl">
							Transform your business with our innovative solutions designed to
							boost productivity and drive growth.
						</p>
						<div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
							<button
								type="button"
								className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition duration-300 hover:bg-indigo-700"
							>
								Get Started
							</button>
							<button
								type="button"
								className="rounded-lg border border-indigo-600 bg-white px-8 py-3 font-semibold text-indigo-600 transition duration-300 hover:bg-indigo-50"
							>
								Learn More
							</button>
						</div>
					</div>
					<div className="flex justify-center md:w-1/2">
						<div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
							<img
								src="https://placehold.co/400x250/4f46e5/white?text=Dashboard+Preview"
								alt="Dashboard preview"
								className="h-auto w-full rounded-lg"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="container mx-auto bg-white px-4 py-16">
				<div className="mb-16 text-center">
					<h2 className="font-bold text-3xl text-gray-900 md:text-4xl">
						Powerful Features
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-gray-600 text-xl">
						Everything you need to succeed in one integrated platform
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{[
						{
							title: "Analytics Dashboard",
							description:
								"Real-time insights with customizable reports and visualizations.",
							icon: "📊",
						},
						{
							title: "Team Collaboration",
							description:
								"Seamless communication and project management tools.",
							icon: "👥",
						},
						{
							title: "Automated Workflows",
							description:
								"Save time with intelligent automation of routine tasks.",
							icon: "⚙️",
						},
					].map((feature) => (
						<div
							key={feature.title}
							className="rounded-xl bg-gray-50 p-8 transition duration-300 hover:shadow-lg"
						>
							<div className="mb-4 text-4xl">{feature.icon}</div>
							<h3 className="mb-2 font-semibold text-gray-900 text-xl">
								{feature.title}
							</h3>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Testimonials */}
			<section className="container mx-auto px-4 py-16">
				<div className="mb-16 text-center">
					<h2 className="font-bold text-3xl text-gray-900 md:text-4xl">
						What Our Customers Say
					</h2>
				</div>

				<div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
					{[
						{
							quote:
								"This platform has completely transformed how we work. The automation features save us hours every week.",
							author: "Sarah Johnson",
							role: "CTO, TechCorp",
						},
						{
							quote:
								"The intuitive interface and powerful analytics have helped us make better decisions faster than ever before.",
							author: "Michael Chen",
							role: "Operations Director, GrowthInc",
						},
					].map((testimonial) => (
						<div
							key={testimonial.quote}
							className="rounded-xl bg-white p-8 shadow-md"
						>
							<p className="text-gray-700 italic">"{testimonial.quote}"</p>
							<div className="mt-6 flex items-center">
								<div className="ml-4">
									<p className="font-semibold text-gray-900">
										{testimonial.author}
									</p>
									<p className="text-gray-600">{testimonial.role}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 p-8 text-center md:p-12">
					<h2 className="mb-4 font-bold text-3xl text-white md:text-4xl">
						Ready to get started?
					</h2>
					<p className="mx-auto mb-8 max-w-2xl text-indigo-100 text-xl">
						Join thousands of satisfied customers and experience the difference
						today.
					</p>
					<button
						type="button"
						className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 transition duration-300 hover:bg-gray-100"
					>
						Start Free Trial
					</button>
				</div>
			</section>
		</div>
	);
}
