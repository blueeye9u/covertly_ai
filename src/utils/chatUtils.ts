import { Chat_Model_data } from "../constants/chat-models-data";
import { EModels, EChatTypes } from "../enums/modals.enum";

export const getSuggestedLLM = (key: string) => {
  if (key === EModels.GPT_3) {
    return Chat_Model_data.find((item) => item.key === EChatTypes.SMART_LLM);
  }
  return Chat_Model_data.find((item) => item.key === key);
};

export const getModelImage = (model: any, isDarkMode: boolean) => {
  if (model?.key === EModels.GROK && model?.imgDark) {
    return isDarkMode ? model.imgDark : model.img;
  }
  return model?.img;
};