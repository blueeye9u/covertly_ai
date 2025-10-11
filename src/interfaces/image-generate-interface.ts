export interface IGenerateResponse<T = null> {
    model: string;
    prompt: string;
    size: "string",
    style: "string",
    payload: T;
  }
  