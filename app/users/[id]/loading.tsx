import UserDetailSkeleton from "@/components/common/UserDetailSkeleton";

export default function UserDetailLoading() {
  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 md:px-6 md:py-10">
      <UserDetailSkeleton />
    </main>
  );
}
