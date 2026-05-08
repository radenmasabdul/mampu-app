export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UserActivity {
  userId: number;
  totalPosts: number;
  completedTodos: number;
  pendingTodos: number;
}

export interface EnrichedUser extends User {
  activity: UserActivity;
}

export type SortField = "name" | "totalPosts" | "pendingTodos" | "completedTodos";
export type SortOrder = "asc" | "desc";
export type FilterType = "all" | "hasPending" | "noCompleted" | "mostPosts";
