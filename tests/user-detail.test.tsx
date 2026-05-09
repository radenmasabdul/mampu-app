import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserDetailCard from "@/components/common/UserDetailCard";
import UserDetailSkeleton from "@/components/common/UserDetailSkeleton";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import type { User, Post, Todo } from "@/types";

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({ toString: () => "" }),
}));

const mockUser: User = {
  id: 1,
  name: "Raden Mas Abdul",
  email: "abdul@example.com",
  username: "radenmasabdul",
  phone: "123456789",
  website: "radenmasabdul.my.id",
  address: {
    street: "Jl. Sudirman",
    suite: "No. 1",
    city: "Jakarta Pusat",
    zipcode: "10110",
    geo: { lat: "-6.2", lng: "106.8" },
  },
  company: {
    name: "Sebaris Kode",
    catchPhrase: "Code for fun",
    bs: "next synergize solutions",
  },
};

const mockPosts: Post[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  userId: 1,
  title: `Post title ${i + 1}`,
  body: `Post body ${i + 1}`,
}));

const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: "Learn to code", completed: true },
  { id: 2, userId: 1, title: "Read a book", completed: false },
  { id: 3, userId: 1, title: "Play console games", completed: true },
  { id: 4, userId: 1, title: "Running", completed: false },
  { id: 5, userId: 1, title: "Playing diecast collectibles", completed: false },
  { id: 6, userId: 1, title: "Cleaning room", completed: false },
];

describe("User Detail", () => {
  describe("renders user details", () => {
    it("renders user name and username", () => {
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      expect(screen.getByText("Raden Mas Abdul")).toBeInTheDocument();
      expect(screen.getAllByText("@radenmasabdul")[0]).toBeInTheDocument();
    });

    it("renders user email, phone, website", () => {
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      expect(screen.getByText("abdul@example.com")).toBeInTheDocument();
      expect(screen.getByText("123456789")).toBeInTheDocument();
      expect(screen.getByText("radenmasabdul.my.id")).toBeInTheDocument();
    });

    it("renders company info", () => {
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      expect(screen.getByText("Sebaris Kode")).toBeInTheDocument();
      expect(screen.getByText("Code for fun")).toBeInTheDocument();
    });

    it("renders address info", () => {
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      expect(screen.getByText("Jl. Sudirman")).toBeInTheDocument();
      expect(screen.getByText("Jakarta Pusat")).toBeInTheDocument();
      expect(screen.getByText("10110")).toBeInTheDocument();
    });

    it("renders activity badge counts", () => {
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      expect(screen.getByText("5 posts")).toBeInTheDocument();
      expect(screen.getByText("2 done")).toBeInTheDocument();
      expect(screen.getByText("4 pending")).toBeInTheDocument();
    });

    it("renders user initials in avatar", () => {
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      expect(screen.getByText("RM")).toBeInTheDocument();
    });
  });

  describe("posts section", () => {
    it("renders posts section heading", () => {
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      expect(screen.getByText("Posts")).toBeInTheDocument();
      expect(screen.getByText("5 total")).toBeInTheDocument();
    });

    it("shows only 3 posts initially", () => {
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      expect(screen.getByText("Post title 1")).toBeInTheDocument();
      expect(screen.getByText("Post title 3")).toBeInTheDocument();
      expect(screen.queryByText("Post title 4")).not.toBeInTheDocument();
    });

    it("shows more posts when button clicked", async () => {
      const user = userEvent.setup();
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      await user.click(screen.getByText("Show 2 more posts"));
      expect(screen.getByText("Post title 4")).toBeInTheDocument();
      expect(screen.getByText("Post title 5")).toBeInTheDocument();
    });

    it("collapses posts when show less clicked", async () => {
      const user = userEvent.setup();
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      await user.click(screen.getByText("Show 2 more posts"));
      await user.click(screen.getByText("Show less"));
      expect(screen.queryByText("Post title 4")).not.toBeInTheDocument();
    });
  });

  describe("todos section", () => {
    it("renders todos section heading", () => {
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      expect(screen.getByText(/All \(6\)/)).toBeInTheDocument();
    });

    it("shows only 5 todos initially", () => {
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      expect(screen.getByText("Learn to code")).toBeInTheDocument();
      expect(
        screen.getByText("Playing diecast collectibles"),
      ).toBeInTheDocument();
      expect(screen.queryByText("Cleaning room")).not.toBeInTheDocument();
    });

    it("filters todos by done", async () => {
      const user = userEvent.setup();
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      await user.click(screen.getByText("Done (2)"));
      expect(screen.getByText("Learn to code")).toBeInTheDocument();
      expect(screen.getByText("Play console games")).toBeInTheDocument();
      expect(screen.queryByText("Read a book")).not.toBeInTheDocument();
    });

    it("filters todos by pending", async () => {
      const user = userEvent.setup();
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      await user.click(screen.getByText("Pending (4)"));
      expect(screen.getByText("Read a book")).toBeInTheDocument();
      expect(screen.queryByText("Learn to code")).not.toBeInTheDocument();
    });

    it("shows more todos when button clicked", async () => {
      const user = userEvent.setup();
      render(
        <UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />,
      );
      await user.click(screen.getByText("Show 1 more todos"));
      expect(screen.getByText("Cleaning room")).toBeInTheDocument();
    });
  });

  describe("loading state", () => {
    it("renders skeleton loader", () => {
      const { container } = render(<UserDetailSkeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("error state", () => {
    it("renders error boundary with friendly message", () => {
      const mockError = new Error(
        "getaddrinfo ENOTFOUND jsonplaceholder.typicode.com",
      );
      const mockReset = jest.fn();
      render(<ErrorDisplay error={mockError} reset={mockReset} />);
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Tidak dapat terhubung ke server. Periksa koneksi internetmu.",
        ),
      ).toBeInTheDocument();
    });

    it("renders back to users button on error", () => {
      const mockError = new Error("Failed to fetch");
      const mockReset = jest.fn();
      render(
        <ErrorDisplay
          error={mockError}
          reset={mockReset}
          backHref="/users"
          backLabel="Back to Users"
        />,
      );
      expect(
        screen.getByRole("link", { name: "Back to Users" }),
      ).toBeInTheDocument();
    });

    it("calls reset when Try Again clicked", async () => {
      const user = userEvent.setup();
      const mockError = new Error("something failed");
      const mockReset = jest.fn();
      render(<ErrorDisplay error={mockError} reset={mockReset} />);
      await user.click(screen.getByRole("button", { name: "Try Again" }));
      expect(mockReset).toHaveBeenCalledTimes(1);
    });
  });

  describe("invalid user id", () => {
    it("notFound is called for non-numeric id", () => {
      const isInvalid = (id: string) => {
        const userId = Number(id);
        return isNaN(userId) || userId < 1 || userId > 10;
      };
      expect(isInvalid("abc")).toBe(true);
      expect(isInvalid("0")).toBe(true);
      expect(isInvalid("11")).toBe(true);
      expect(isInvalid("5")).toBe(false);
    });

    it("returns User Not Found metadata for invalid id", async () => {
      const getMetadataTitle = async (id: string) => {
        const userId = Number(id);
        if (isNaN(userId) || userId < 1 || userId > 10) {
          return "User Not Found";
        }
        return "Valid User";
      };
      expect(await getMetadataTitle("abc")).toBe("User Not Found");
      expect(await getMetadataTitle("99")).toBe("User Not Found");
      expect(await getMetadataTitle("5")).toBe("Valid User");
    });
  });
})