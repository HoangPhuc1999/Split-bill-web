// Expense model interfaces based on API response

export interface Participant {
  user_id: string;
  share: number;
  name: string;
  email: string;
  phone_number: string;
}

export interface ExpenseDataResponse {
  _id: string;
  description: string;
  amount: number;
  currency: string;
  paid_by: string;
  group_ids: string[];
  split_type: string;
  participants: Participant[];
  note: string;
  category: string;
  created_at: string;
  modified_at: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: string;
  paid_by: string;
  group_ids: string[];
  split_type: "equal" | "custom";
  participants: ExpenseParticipant[];
  note?: string;
  category: string;
  createdAt: Date;
  modified_at: Date;
  settlement_status: string | null;
  icon?: string;
}

export interface ExpenseParticipant {
  user_id: string;
  share: number;
  name: string;
  email: string;
  phone_number?: string;
}

// Additional utility types for the expense system
export type SplitType = "equal" | "percentage" | "exact" | "shares";

export type ExpenseCategory =
  | "general"
  | "food"
  | "transportation"
  | "entertainment"
  | "utilities"
  | "shopping"
  | "healthcare"
  | "other";

export type Currency = "VND" | "USD" | "EUR" | "GBP" | "JPY";
