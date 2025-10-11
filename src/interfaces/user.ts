export interface IUser {
  _id: string;
  email: string;
  fullName?: string;
  avatar?: string;
  emailVerifiedAt?: Date;
  isActive?: boolean;
  role?: string;
  tokenCredits?: number;
  uniqueId?: string;
  stripePriceId?: string;
  subscriptionEndDate?: Date;
  gpt4Tokens?: number;
  weeklyTokensUsed?: number;
  dailyQuestionCount?: number;
  chatDeletionDays?: number;
}
