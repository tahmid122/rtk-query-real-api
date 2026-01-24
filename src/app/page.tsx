const Home = () => {
  return (
    <section className="">
      {" "}
      <main className="bg-gray-50 text-gray-800">
        {/* HERO SECTION */}
        <section className="bg-linear-to-br from-primary/90 to-emerald-600 py-24 text-white">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h1 className="text-4xl font-bold md:text-5xl">
              Never Miss Your Medicine Again
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white">
              Smart medicine reminders, dose tracking, and health clarity — all
              in one simple app.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button className="rounded-xl bg-white px-6 py-3 font-semibold text-primary/90 hover:bg-white/90">
                Get Started
              </button>
              <button className="rounded-xl border border-white/40 px-6 py-3 hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl font-semibold">About the App</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Managing medicines can be overwhelming — multiple doses,
                  different times, and constant reminders. Our app is designed
                  to simplify your routine by tracking every pill, reminding you
                  at the right time, and giving you full control over your
                  health.
                </p>
                <p className="mt-4 text-gray-600">
                  Whether it’s a short treatment or long-term care, we help you
                  stay consistent and stress-free.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-primary/90" />
                    Smart dose scheduling
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-primary/90" />
                    Real-time reminders
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-primary/90" />
                    Progress & pill tracking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-semibold">How It Works</h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-lg font-semibold">1. Add Medicine</h3>
                <p className="mt-2 text-gray-600">
                  Enter dose name, amount, time, and duration in seconds.
                </p>
              </div>

              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-lg font-semibold">2. Get Reminders</h3>
                <p className="mt-2 text-gray-600">
                  Receive notifications exactly when it’s time.
                </p>
              </div>

              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-lg font-semibold">3. Track Progress</h3>
                <p className="mt-2 text-gray-600">
                  See taken pills, remaining doses, and next intake.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-semibold">Key Features</h2>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                "Multiple Dose Times",
                "Color-coded Slots",
                "Notification Control",
                "Remaining Time Tracker",
              ].map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl bg-white p-5 text-center shadow-sm"
                >
                  <p className="font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-linear-to-br from-primary/90 to-emerald-600 py-16 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">
              Take Control of Your Health Today
            </h2>
            <p className="mt-3 text-white">
              Start tracking your medicines the smart way.
            </p>

            <button className="mt-6 rounded-xl bg-white px-8 py-3 font-semibold text-primary/90 hover:bg-white/90">
              Start Now
            </button>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Home;
