import Link from "next/link";
import ButtonApp from "@/components/common/Button";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          UserOps
        </h1>

        <p className="mb-10 text-base leading-7 text-zinc-600 md:text-lg">
          Explore users, their activity signals, posts, and todos — all in one
          workspace.
        </p>

        <ButtonApp className="bg-red-500 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-red-600">
          <Link href="/users">View Users</Link>
        </ButtonApp>
      </div>
    </main>
  );
}
