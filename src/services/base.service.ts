import axios, { CancelTokenStatic, CancelTokenSource } from "axios";
import Cookies from "js-cookie";
import NiceModal from "@ebay/nice-modal-react";

const Config = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export class HttpService {
  CancelToken: CancelTokenStatic;
  source: CancelTokenSource;

  constructor() {
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
    this.setUpAuthorizationHeader();
    this.setUpErrorInterceptor();
  }

  private setUpAuthorizationHeader() {
    const token = HttpService.getToken();
    if (token && HttpService.isTokenValid(token)) {
      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${HttpService.getToken()}`;
    }
  }

  private setUpErrorInterceptor() {
    axios.interceptors.response.use(undefined, function (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        HttpService.clearCookie();
        localStorage.clear();

        NiceModal.show("sessionExpired");
      }

      // Ensure we're passing an Error object
      return Promise.reject(error instanceof Error ? error : new Error(error));
    });
  }

  /**
   * Set Token On Header
   * @param token
   */
  static setToken(token: string): void {
    axios.defaults!.headers!["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Validates the token.
   * @param token The token to validate.
   * @returns {boolean} True if the token is valid, false otherwise.
   */
  static isTokenValid(token: string): boolean {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch (err) {
      console.error("Invalid token format", err);
      return false;
    }
  }

  /**
   * Retrieves the token from the cookies.
   * @returns {string | undefined} The token value if found, otherwise undefined.
   */
  static getToken(): string {
    return Cookies.get("token") ?? "";
  }

  static clearCookie() {
    Cookies.remove("token");
    Cookies.remove("model");
    Cookies.remove("email");
    Cookies.remove("userId");
    Cookies.remove("avatar");
    Cookies.remove("fullName");
    Cookies.remove("uniqueId");
  }

  /**
   * Sets a cookie with the specified name and value.
   * @param {string} name The name of the cookie.
   * @param {string} value The value to be stored in the cookie.
   */
  static setCookie(name: string, value: string): void {
    Cookies.set(name, value, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });
  }

  /**
   * Fetch data from server
   * @param url Endpoint link
   * @return Promise
   */
  protected get = async (url: string, params?: any, signal?: AbortSignal): Promise<any> => {
    try {
      const res = await axios.get(`${Config}/${url}`, {
        params,
        cancelToken: this.source.token,
        signal, // Add AbortSignal support alongside existing CancelToken
      });
      return res.data;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  /**
   * Write data over server
   * @param url Endpoint link
   * @param body Data to send over server
   * @return Promise
   */
  protected post = async (
    url: string,
    body?: any,
    options = {}
  ): Promise<any> => {
    try {
      const res = await axios.post(`${Config}/${url}`, body, {
        ...options,
        cancelToken: this.source.token,
      });
      return res.data;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  /**
   * Delete Data From Server
   * @param url Endpoint link
   * @param params Embed as query params
   * @return Promise
   */
  protected delete = async (
    url: string,
    params?: any,
    data?: any
  ): Promise<any> => {
    try {
      const res = await axios.delete(`${Config}/${url}`, { params, data });
      return res.data;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  /**
   * Update data on server
   * @param url Endpoint link
   * @param body Data to send over server
   * @param params Embed as query params
   * @return Promise
   */
  put = async (url: string, body?: any, params?: any): Promise<any> => {
    try {
      const res = await axios.put(`${Config}/${url}`, body, {
        ...params,
        cancelToken: this.source.token,
      });
      return res.data;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  private updateCancelToken() {
    this.source = this.CancelToken.source();
  }

  cancel = () => {
    this.source.cancel("Explicitly cancelled HTTP request");
    this.updateCancelToken();
  };
}