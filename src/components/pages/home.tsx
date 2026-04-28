export function Home() {
  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Welcome to <span className="text-indigo-600">Our Platform</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-lg">
              Transform your business with our innovative solutions designed to
              boost productivity and drive growth.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300">
                Get Started
              </button>
              <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg border border-indigo-600 hover:bg-indigo-50 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
              <img
                src="https://placehold.co/400x250/4f46e5/white?text=Dashboard+Preview"
                alt="Dashboard preview"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Powerful Features
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed in one integrated platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-md">
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
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers and experience the difference
            today.
          </p>
          <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
