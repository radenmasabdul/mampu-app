import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-500">
          User Operations
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 md:text-6xl">
          UserOps
        </h1>

        <p className="mb-10 text-base leading-7 text-zinc-600 md:text-lg">
          Explore users, their activity signals, posts, and todos — all in one
          workspace.
        </p>

        <Link
          href="/users"
          className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-600"
        >
          View Users
        </Link>
      </div>
    </main>
  );
}
