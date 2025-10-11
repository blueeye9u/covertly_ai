import { HttpService } from "./base.service";
class PromptEnhancerService extends HttpService {
  private readonly prefix: string = "prompt-enhancer";
  translatePrompt = (data: { text: string, targetLanguage: string }):Promise<any> => this.post(`${this.prefix}/translate`, data);
  improvePrompt = (data: { prompt: string }):Promise<any> => this.post(`${this.prefix}/improve`, data);
}
export const promptEnhancerService = new PromptEnhancerService();