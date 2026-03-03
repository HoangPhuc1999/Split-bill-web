// src/lib/repositories/UserRepository.ts
import { http } from "@/lib/api/https";
import { setTokens } from "@/lib/auth/tokenStore";
import { withAuth } from "@/lib/auth/withAuth";
import { Expense, ExpenseDataResponse } from "@/models/Expense";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export type LoginResponse = {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
};

export const ExpenseRepository = {
  async startTraining(): Promise<TrainingResponse> {
    return withAuth(async () => {
      const data = await http.post<TrainingResponse, TrainingResponse>(
        "/user/start-training",
      );
      return data;
    });
  },

  async getExpenseDetails(expenseId: string): Promise<Expense> {
    const response = await http.get<Expense>(`/expenses/${expenseId}`);
    return response as unknown as Expense;
  },
};

export interface TrainingResponse {
  id: string;
  content: string;
  ans_1: {
    content: string;
  };
  ans_2: {
    content: string;
  };
}
