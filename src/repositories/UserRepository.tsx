// src/lib/repositories/UserRepository.ts
import { http } from "@/lib/api/https";
import { setTokens } from "@/lib/auth/tokenStore";
import { withAuth } from "@/lib/auth/withAuth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from "@/models/User";

export type LoginResponse = {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
};

export const UserRepository = {
  async me(): Promise<User> {
    return withAuth(async () => {
      const { data } = await http.get<User>("/auth/me");
      return data;
    });
  },

  // Example of future endpoints:
  async updateProfile(payload: { name?: string; email?: string }) {
    return withAuth(async () => {
      const { data } = await http.patch("/user", payload);
      return data;
    });
  },

  async updateUser(payload: {
    sex: string;
    name: string;
    realJob: string;
    age: string;
    modelAi?: string;
  }) {
    return withAuth(async () => {
      const data = await http.patch("/user", {
        ...payload,
        age: Number.parseInt(payload.age), // Convert string to number
      });
      return data;
    });
  },

  async uploadAvatar(file: File) {
    return withAuth(async () => {
      const form = new FormData();
      form.append("file", file);
      const { data } = await http.post("/user/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    });
  },

  async login(args: {
    username: string;
    password: string;
    deviceName?: string;
  }): Promise<LoginResponse> {
    const ua =
      typeof navigator !== "undefined" && navigator.userAgent
        ? navigator.userAgent
        : "web/unknown";

    const payload = {
      username: args.username,
      password: args.password,
      device_name: args.deviceName ?? ua,
    };

    const response = await http.post<LoginResponse>("/auth/login", payload);
    const responseData = response.data || response;
    const expiresAt = responseData.expires_at
      ? Date.now() + responseData.expires_at * 1000
      : undefined;
    setTokens({
      accessToken: responseData.access_token,
      refreshToken: responseData.refresh_token,
      expiresAt,
    });

    return responseData;
  },

  async register(param: {
    username: string;
    password: string;
    email?: string;
  }): Promise<unknown> {
    const payload = {
      username: param.username,
      password: param.password,
      email: param.email,
    };
    return await http.post<LoginResponse>("/auth/register", payload);
  },

  async changePassword(payload: {
    old_password: string;
    new_password: string;
    confirm_password: string;
  }): Promise<unknown> {
    return withAuth(async () => {
      const data = await http.post("/auth/change-password", payload);
      return data;
    });
  },

  async getCharactorInfo(router?: {
    push?: (path: string) => void;
  }): Promise<User | null> {
    try {
      return await withAuth(async () => {
        const data = await http.get<User, User>("/auth/me");
        return data;
      });
    } catch {
      // Try refresh if refresh_token exists
      const { loadTokens, setTokens } = await import("@/lib/auth/tokenStore");
      const tokens = loadTokens();
      if (tokens?.refreshToken) {
        try {
          // Try refresh token
          type RefreshTokenResponse = {
            access_token: string;
            refresh_token?: string;
            expires_at?: number;
          };
          const res = await http.post<RefreshTokenResponse>(
            "/auth/refresh-token",
            {
              refresh_token: tokens.refreshToken,
            },
          );
          const tokenData = res?.data || res;
          setTokens({
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token ?? tokens.refreshToken,
            expiresAt: tokenData.expires_at
              ? Date.now() + tokenData.expires_at * 1000
              : undefined,
          });
          // Retry original call
          return await withAuth(async () => {
            const data = await http.get<User, User>("/auth/me");
            return data;
          });
        } catch {
          // If refresh fails, clear tokens and redirect
          const { clearTokens } = await import("@/lib/auth/tokenStore");
          clearTokens();
          if (router && typeof router.push === "function") {
            router.push("/auth");
          } else if (typeof window !== "undefined") {
            window.location.href = "/auth";
          }
          return null;
        }
      } else {
        // No refresh token, redirect to /auth
        const { clearTokens } = await import("@/lib/auth/tokenStore");
        clearTokens();
        if (router && typeof router.push === "function") {
          router.push("/auth");
        } else if (typeof window !== "undefined") {
          window.location.href = "/auth";
        }
        return null;
      }
    }
  },

  async initCharacterWithRoll(characterData: {
    rollId: number;
    name: string;
    age: number;
    sex: string;
    jobId: number;
    cultivationClassId: number;
    cultivationAtribute: string;
    modelAi: string;
  }): Promise<unknown> {
    return withAuth(async () => {
      const data = await http.post(
        "/user/init-character-with-roll",
        characterData,
      );
      return data;
    });
  },
  async allocatePoint(payload: {
    _id?: string;
    strength: number;
    intelligence: number;
    divineSense: number;
  }) {
    return withAuth(async () => {
      const data = await http.post<User, User>(
        "/user/allocate-points",
        payload,
      );
      return data;
    });
  },

  async startMeditation(): Promise<User | null> {
    return withAuth(async () => {
      const data = await http.post<User, User>("/user/meditation");
      return data;
    });
  },

  async stopMeditation(): Promise<number | null> {
    return withAuth(async () => {
      const data = await http.post<number, number>("/user/stop-meditation");
      console.log("Stopped meditation, response:", data);
      return data;
    });
  },

  async resetUser(): Promise<unknown> {
    return withAuth(async () => {
      const data = await http.post("/user/reset-user", {});
      return data;
    });
  },

  async startTraining(): Promise<TrainingResponse> {
    return withAuth(async () => {
      const data = await http.post<TrainingResponse, TrainingResponse>(
        "/user/start-training",
      );
      return data;
    });
  },

  async stopTraining(payload: {
    id: string;
    ans: string;
  }): Promise<TrainingResultResponse> {
    return withAuth(async () => {
      const data = await http.post<
        TrainingResultResponse,
        TrainingResultResponse
      >("/user/stop-training", payload);
      return data;
    });
  },

  async logout(): Promise<unknown> {
    return withAuth(async () => {
      const data = await http.post("/auth/logout", {});
      return data;
    });
  },

  async checkName(name: string): Promise<CheckNameResponse> {
    return withAuth(async () => {
      const data = await http.post<CheckNameResponse, CheckNameResponse>(
        "/user/check-name",
        {
          name,
        },
      );
      return data;
    });
  },

  async dailyAward(): Promise<DailyAwardResponse> {
    return withAuth(async () => {
      const data = await http.post<DailyAwardResponse, DailyAwardResponse>(
        "/user/daily-award",
        {},
      );
      return data;
    });
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

export interface TrainingResultResponse {
  content_question: string;
  content_answer: string;
  content_result: string;
  spiritual_qi_reward: number;
  gold_reward: number;
}

export interface CheckNameResponse {
  available: boolean;
  message: string;
  name: string;
}

export interface DailyAwardResponse {
  success: boolean;
  message: string;
  goldEarned: number;
  backgroundBonus: number;
  currentSpiritualQi: number;
  currentGold: number;
  remainingClaims: number;
  maxDailyAwards: number;
  nextAvailableTime: string;
}
