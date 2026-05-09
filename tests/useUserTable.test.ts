import { renderHook, act } from "@testing-library/react";
import { useUserTable } from "@/hooks/users/useUserTable";
import type { EnrichedUser } from "@/types";

const mockUsers: EnrichedUser[] = [
  {
    id: 1,
    name: "Raden Mas Abdul",
    email: "abdul@example.com",
    username: "radenmasabdul",
    phone: "123456789",
    website: "radenmasabdul.my.id",
    address: { street: "", suite: "", city: "", zipcode: "", geo: { lat: "", lng: "" } },
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
    address: { street: "", suite: "", city: "", zipcode: "", geo: { lat: "", lng: "" } },
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
    address: { street: "", suite: "", city: "", zipcode: "", geo: { lat: "", lng: "" } },
    company: { name: "", catchPhrase: "", bs: "" },
    activity: { userId: 3, totalPosts: 7, completedTodos: 2, pendingTodos: 0 },
  },
];

describe("UseUserTable", () => {
  describe("initial state", () => {
    it("return all users by default", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      expect(result.current.processedData).toHaveLength(3);
    });

    it("default sort by name ascending", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      const names = result.current.processedData.map((data) => data.name);
      expect(names).toEqual(["Bubu Dudu", "Noraika", "Raden Mas Abdul"]);
    });
  });

  describe("search", () => {
    it("filter by name case insensitive", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      act(() => { result.current.setSearch("abdul")});
      expect(result.current.processedData).toHaveLength(1);
      expect(result.current.processedData[0].name).toBe("Raden Mas Abdul");
    });

    it("filter by email", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      act(() => { result.current.setSearch("bubududu@example.com")});
      expect(result.current.processedData).toHaveLength(1);
      expect(result.current.processedData[0].email).toBe("bubududu@example.com");
    });

    it("return empty when no match", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      act(() => { result.current.setSearch("Hmmm")});
      expect(result.current.processedData).toHaveLength(0);
    });
  });

  describe("filter", () => {
    it("hasPending show only user with pending todos > 0", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      act(() => { result.current.setFilter("hasPending")});
      const names = result.current.processedData.map((data) => data.name);
      expect(names).toContain("Raden Mas Abdul");
      expect(names).toContain("Noraika");
      expect(names).not.toContain("Bubu Dudu");
    });

    it("noCompleted shows only users with zero completed todos", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      act(() => { result.current.setFilter("noCompleted")});
      expect(result.current.processedData).toHaveLength(1);
      expect(result.current.processedData[0].name).toBe("Noraika");
    });

    it("return all users when filter is all", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      act(() => { result.current.setFilter("hasPending")});
      act(() => { result.current.setFilter("all")});
      expect(result.current.processedData).toHaveLength(3);
    });
  });
  
  describe("sort", () => {
    it("sort by totalPosts descending", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      act(() => {
        result.current.setSortField("totalPosts");
        result.current.setSortOrder("desc");
      });
      const posts = result.current.processedData.map((data) => data.activity.totalPosts);
      expect(posts).toEqual([10, 7, 3]);
    });

    it("sorts by pendingTodos ascending", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      act(() => {
        result.current.setSortField("pendingTodos");
        result.current.setSortOrder("asc");
      });
      const pending = result.current.processedData.map((data) => data.activity.pendingTodos);
      expect(pending).toEqual([0, 3, 8]);
    });

    it("sorts by name descending", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      act(() => { result.current.setSortOrder("desc"); });
      const names = result.current.processedData.map((data) => data.name);
      expect(names).toEqual(["Raden Mas Abdul", "Noraika", "Bubu Dudu"]);
    });
  });

  describe("empty state", () => {
    it("handles empty users array", () => {
      const { result } = renderHook(() => useUserTable({ users: [] }));
      expect(result.current.processedData).toHaveLength(0);
      expect(result.current.totalRows).toBe(0);
    });
  });

  describe("stats", () => {
    it("calculates total posts correctly", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      expect(result.current.stats.totalPosts).toBe(20);
    });

    it("calculates total pending correctly", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      expect(result.current.stats.totalPending).toBe(11);
    });

    it("calculates total completed correctly", () => {
      const { result } = renderHook(() => useUserTable({ users: mockUsers }));
      expect(result.current.stats.totalCompleted).toBe(7);
    });
  });
})
