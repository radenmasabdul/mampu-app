import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTable from "@/components/common/DataTable";
import DataTableSkeleton from "@/components/common/DataTableSkeleton";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import type { EnrichedUser } from "@/types";

const mockUsers: EnrichedUser[] = [
  {
    id: 1,
    name: "Raden Mas Abdul",
    email: "abdul@example.com",
    username: "radenmasabdul",
    phone: "123456789",
    website: "radenmasabdul.my.id",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" },
    },
    company: { name: "", catchPhrase: "", bs: "" },
    activity: { userId: 1, totalPosts: 10, completedTodos: 5, pendingTodos: 3 },
  },
  {
    id: 2,
    name: "Noraika",
    email: "nora@example.com",
    username: "noraika",
    phone: "123456789",
    website: "noraika.com",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" },
    },
    company: { name: "", catchPhrase: "", bs: "" },
    activity: { userId: 2, totalPosts: 3, completedTodos: 0, pendingTodos: 8 },
  },
  {
    id: 3,
    name: "Bubu Dudu",
    email: "bubududu@example.com",
    username: "bubududu",
    phone: "123456789",
    website: "bubududu.com",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" },
    },
    company: { name: "", catchPhrase: "", bs: "" },
    activity: { userId: 3, totalPosts: 7, completedTodos: 2, pendingTodos: 0 },
  },
];

describe("User List", () => {
  describe("renders users with activity signals", () => {
    it("renders all user names", () => {
      render(<DataTable users={mockUsers} />);
      expect(screen.getByText("Raden Mas Abdul")).toBeInTheDocument();
      expect(screen.getByText("Noraika")).toBeInTheDocument();
      expect(screen.getByText("Bubu Dudu")).toBeInTheDocument();
    });

    it("renders all emails", () => {
      render(<DataTable users={mockUsers} />);
      expect(screen.getByText("abdul@example.com")).toBeInTheDocument();
      expect(screen.getByText("nora@example.com")).toBeInTheDocument();
    });

    it("renders activity signals columns", () => {
      render(<DataTable users={mockUsers} />);
      expect(screen.getByText("Posts")).toBeInTheDocument();
      expect(screen.getByText("Completed")).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    it("renders correct totalPosts values", () => {
      render(<DataTable users={mockUsers} />);
      const rows = screen.getAllByRole("row");
      const rowUser = rows.find((data) => within(data).queryByText("Raden Mas Abdul"));
      expect(within(rowUser!).getByText("10")).toBeInTheDocument();
    });

    it("renders stats summary correctly", () => {
      render(<DataTable users={mockUsers} />);
      expect(screen.getByText("Total Posts")).toBeInTheDocument();
      expect(screen.getByText("Completed Todos")).toBeInTheDocument();
      expect(screen.getByText("Pending Todos")).toBeInTheDocument();
    });
  });

  describe("search filters", () => {
    it("filters users by name", async () => {
      const user = userEvent.setup();
      render(<DataTable users={mockUsers} />);
      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "Abdul");
      expect(screen.getByText("Raden Mas Abdul")).toBeInTheDocument();
      expect(screen.queryByText("Noraika")).not.toBeInTheDocument();
      expect(screen.queryByText("Bubu Dudu")).not.toBeInTheDocument();
    });

    it("filters users by email", async () => {
      const user = userEvent.setup();
      render(<DataTable users={mockUsers} />);
      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "nora@example.com");
      expect(screen.getByText("Noraika")).toBeInTheDocument();
      expect(screen.queryByText("Bubu Dudu")).not.toBeInTheDocument();
    });

    it("shows empty state when search has no match", async () => {
      const user = userEvent.setup();
      render(<DataTable users={mockUsers} />);
      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "hmmmm");
      expect(screen.getByText("No users found")).toBeInTheDocument();
      expect(
        screen.getByText("Try adjusting your search or filter"),
      ).toBeInTheDocument();
    });
  });

  describe("additional filter", () => {
    it("shows filter select with correct options", () => {
      render(<DataTable users={mockUsers} />);
      expect(screen.getByText("All Users")).toBeInTheDocument();
    });

    it("sort order button toggles aria-label", async () => {
      const user = userEvent.setup();
      render(<DataTable users={mockUsers} />);
      const sortButton = screen.getByRole("button", { name: "Sort descending" });
      await user.click(sortButton);
      expect(
        screen.getByRole("button", { name: "Sort ascending" }),
      ).toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    it("shows empty state when no users passed", () => {
      render(<DataTable users={[]} />);
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });

    it("shows empty state message", () => {
      render(<DataTable users={[]} />);
      expect(
        screen.getByText("Try adjusting your search or filter"),
      ).toBeInTheDocument();
    });
  });

  describe("loading state", () => {
    it("renders skeleton loader", () => {
      const { container } = render(<DataTableSkeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders correct number of skeleton rows", () => {
      const { container } = render(<DataTableSkeleton />);
      const skeletonRows = container.querySelectorAll(".animate-pulse");
      expect(skeletonRows.length).toBeGreaterThan(0);
    });
  });

  describe("error state", () => {
    it("renders error message", () => {
      const mockError = new Error("Failed to fetch users");
      const mockReset = jest.fn();
      render(<ErrorDisplay error={mockError} reset={mockReset} />);
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("renders friendly network error message", () => {
      const mockError = new Error(
        "getaddrinfo ENOTFOUND jsonplaceholder.typicode.com",
      );
      const mockReset = jest.fn();
      render(<ErrorDisplay error={mockError} reset={mockReset} />);
      expect(
        screen.getByText(
          "Tidak dapat terhubung ke server. Periksa koneksi internetmu.",
        ),
      ).toBeInTheDocument();
    });

    it("calls reset when Try Again is clicked", async () => {
      const user = userEvent.setup();
      const mockError = new Error("something went wrong");
      const mockReset = jest.fn();
      render(<ErrorDisplay error={mockError} reset={mockReset} />);
      await user.click(screen.getByRole("button", { name: "Try Again" }));
      expect(mockReset).toHaveBeenCalledTimes(1);
    });
  });
})