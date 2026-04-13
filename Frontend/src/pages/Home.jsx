import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="border-b border-slate-800">
        <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full border border-slate-800 bg-slate-900 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              SyncBoard
            </p>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Organize tasks.
              <br />
              Collaborate in real time.
              <br />
              Stay in sync.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              SyncBoard is a real-time collaborative workspace where teams can
              create boards, manage lists, move tasks smoothly, and keep track
              of work without the clutter.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-xl bg-[#9fbfec] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#8db3e5]"
              >
                Get Started
              </Link>

              <Link
                to="/signin"
                className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
              >
                Sign In
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
                Real-time collaboration
              </span>
              <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
                Task tracking
              </span>
              <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
                Clean workflow
              </span>
            </div>
          </div>

          {/* Product Preview */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Product Launch Board
                  </h2>
                  <p className="text-sm text-slate-400">
                    Track progress across your workflow
                  </p>
                </div>
                <span className="rounded-full bg-[#9fbfec]/15 px-3 py-1 text-xs font-medium text-[#9fbfec]">
                  Live
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <h3 className="text-sm font-semibold text-slate-200">Todo</h3>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl bg-[#1e293b] p-3 text-sm text-slate-200">
                      Setup authentication
                    </div>
                    <div className="rounded-xl bg-[#1e293b] p-3 text-sm text-slate-200">
                      Create board UI
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <h3 className="text-sm font-semibold text-slate-200">
                    In Progress
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl bg-[#23324a] p-3 text-sm text-slate-200">
                      Connect backend APIs
                    </div>
                    <div className="rounded-xl bg-[#23324a] p-3 text-sm text-slate-200">
                      Build drag and drop
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <h3 className="text-sm font-semibold text-slate-200">Done</h3>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl bg-[#2a223f] p-3 text-sm text-slate-200">
                      Project structure
                    </div>
                    <div className="rounded-xl bg-[#2a223f] p-3 text-sm text-slate-200">
                      Board and list layout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SyncBoard */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Why SyncBoard
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Built for focused collaboration
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              SyncBoard helps you manage work visually without making the
              experience feel heavy. It is simple enough to use quickly, but
              structured enough to support real teamwork.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h3 className="text-lg font-semibold text-white">
                Real-time updates
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Keep everyone aligned with instant board activity and task
                movement across lists.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h3 className="text-lg font-semibold text-white">
                Clear task flow
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Organize work from idea to completion with a workflow that feels
                simple and visual.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h3 className="text-lg font-semibold text-white">
                Team collaboration
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Work with members, assign ownership, and keep boards useful for
                both individuals and teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Workflow Section */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Workflow
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                A smooth workflow from planning to progress
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                Create boards, break work into lists, move cards as progress
                changes, and keep everything visible in one place.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm font-semibold text-[#9fbfec]">01</p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Create your board
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Start with a board for your project, team, or personal
                  workflow.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm font-semibold text-[#9fbfec]">02</p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Add lists and tasks
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Structure your work into stages and create cards for what
                  needs to get done.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm font-semibold text-[#9fbfec]">03</p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Track progress in real time
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Move tasks, update details, and keep the whole team aligned as
                  work changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Start building with SyncBoard
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
              A simple and collaborative workspace for managing boards, lists,
              and tasks without losing clarity.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="rounded-xl bg-[#9fbfec] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#8db3e5]"
              >
                Create Account
              </Link>

              <Link
                to="/signin"
                className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;