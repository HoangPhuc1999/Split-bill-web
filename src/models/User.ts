export interface Effect {
  _id: string;
  createdAt: string;
  modifiedAt: string;
  trainSpeed: number;
  rewardBonus: number;
  breakthroughRate: number;
}

export interface Aptitude {
  _id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  description: string;
  rank: string;
  effect: Effect;
}

export interface Luck {
  _id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  rank: string;
  gameplayImpact: string;
}

export interface Background {
  _id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  description: string;
  rank: string;
}

export interface CultivationClass {
  _id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  description: string;
}

export interface Requirement {
  _id: string;
  createdAt: string;
  modifiedAt: string;
  spiritualQi: number;
  gold: number;
}

export interface MissionBonus {
  _id: string;
  createdAt: string;
  modifiedAt: string;
  spiritualQi: string;
  gold: string;
}

export interface ImmortalRealm {
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  description: string;
  maxAge: number;
  requirement: Requirement;
  missionBonus: MissionBonus;
  awardPowerPoint: number;
}

export interface User {
  _id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  hashedPassword: string;
  username: string;
  isActive: boolean;
  status: string;
  startTimeMediation: string | null;
  startTimeTraining: string | null;
  sex: string | null;
  name: string;
  realJob: string;
  age: number;
  cultivationAtribute: string;
  cultivationClass: CultivationClass;
  cultivationJob: string;
  aptitude: Aptitude;
  luck: Luck;
  background: Background;
  strength: number;
  intelligence: number;
  divineSense: number;
  spiritualQi: number;
  gold: number;
  awardPowerPoint: number;
  role: string;
  numberQuest: number;
  numberTraining: number;
  cultivationAge: number;
  isAlive: boolean;
  isInited: boolean;
  maxRoll: number;
  immortalRealm: ImmortalRealm;
  modelAi: string;
  numberCourse: number;
  dailyAwardCount: number;
}

// Optional: Create types for creating/updating users (without system-generated fields)
export type CreateUserRequest = Omit<
  User,
  "_id" | "createdAt" | "modifiedAt" | "hashedPassword"
> & {
  password: string;
};

export type UpdateUserRequest = Partial<
  Omit<User, "_id" | "createdAt" | "modifiedAt" | "hashedPassword">
>;

// Type for user response (without sensitive data)
export type UserResponse = Omit<User, "hashedPassword">;

// Enums for better type safety
export enum UserStatus {
  FREE = "free",
  BUSY = "busy",
  TRAINING = "training",
  MEDITATION = "meditation",
}

export enum CultivationAttribute {
  STRENGTH = "strength",
  INTELLIGENCE = "intelligence",
  DIVINE_SENSE = "divineSense",
  SPIRITUAL_QI = "spiritualQi",
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

export enum AptitudeRank {
  S = "S",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}
