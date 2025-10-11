import { ImageGeneration } from "../context/imageGeneration.context";
import { HttpService } from "./base.service";

class ImageGenerationService extends HttpService {
  private readonly prefix: string = "image-generator";

  getAllGeneratedImages = (data: { page: number, limit: number, createdAt?: string, searchTerm?: string }):Promise<any> => this.get(`${this.prefix}`, data);
  
  getAllGeneratedImagesGrouped = (data: { searchTerm?: string }):Promise<any> => this.get(`${this.prefix}/grouped`, data);
  
  postImageGeneration = (data: ImageGeneration):Promise<any> => this.post(`${this.prefix}`, data);
  getByMonth = (data: {baseDate:number, page:number}):Promise<any> => this.post(`${this.prefix}/month`, data);
  getAvailableDatesByMonth = (baseDate?: number):Promise<any> => this.get(`${this.prefix}/available-dates/month`, baseDate ? { baseDate } : undefined);
  deleteSelectedImages = (data: {ids: string[]}):Promise<any> => this.delete(`${this.prefix}/selected`, undefined, data);
  deleteAllImages = ():Promise<any> => this.delete(`${this.prefix}/`);
  deleteSelectedImageUrls = (data: {items: Array<{recordId: string; imageUrl: string}>}):Promise<any> => this.delete(`${this.prefix}/bulk/image-urls`, undefined, data);
}
export const imageGenerationService = new ImageGenerationService();