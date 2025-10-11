import { EGptModels } from "../enums/gpt-models.enum";
import { ISubscriptionType } from "../enums/subscription.enum"

export const isBasic = (plan: string) => {
  if(plan === ISubscriptionType.STARTER_MONTHLY || plan === ISubscriptionType.STARTER_YEARLY) {
      return true;
  } return false;
}

export const isAdvanced = (plan: string) => {
    if(plan === ISubscriptionType.UNLIMITED_MONTHLY || plan === ISubscriptionType.UNLIMITED_YEARLY) {
        return true;
    } return false;
}

export const isPremium = (plan: string) => {
    if(plan === ISubscriptionType.PRO_MONTHLY || plan === ISubscriptionType.PRO_YEARLY) {
        return true;
    } return false;
}

export const isGPTModel = (model: string) => {
    return model === EGptModels.GPT_4;
}