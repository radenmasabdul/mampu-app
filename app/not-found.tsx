import Image from "next/image";
import Link from "next/link";
import image from "@/public/image.svg";
import ButtonApp from "@/components/common/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:justify-between">
        <div className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Page not found
          </h1>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            The page you are looking for might have been removed, renamed, or is
            temporarily unavailable.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonApp className="bg-blue-400 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600">
              <Link href="/">Back to Home</Link>
            </ButtonApp>
          </div>
        </div>

        <div className="flex w-full max-w-md items-center justify-center lg:max-w-lg">
          <Image
            src={image}
            alt="404 Illustration"
            priority
            className="h-auto w-full max-w-sm sm:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </main>
  );
}
