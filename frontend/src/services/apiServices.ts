import AxiosServices from "./AxiosServices";

class UrlService extends AxiosServices {
  async shortenUrl(url: string) {
    const response = await this.post("/api/url/shorten", { original: url });
    return response.data;
  }
  async getOriginalUrl(shortCode: string) {
    const response = await this.get(`/api/url/${shortCode}`);
    return response.data;
  }

  async getUrlStats(shortCode: string): Promise<{ clicks: number }> {
    const response = await this.get(`/api/url/stats/${shortCode}`);
    return response.data;
  }
  async getUserUrls(userId: string) {
    const response = await this.get(`/api/url/${userId}/urls`);
    return response.data;
  }
}
export const urlService = new UrlService();

class AuthService extends AxiosServices {
  async login(email: string, password: string) {
    const response = await this.post("/api/auth/login", { email, password });
    return response.data;
  }
  async register(name: string, email: string, password: string) {
    const response = await this.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  }
  async logout() {
    const response = await this.post("/api/auth/logout");
    return response.data;
  }
  async verifySession() {
    const response = await this.get("/api/auth/verify-session");
    return response;
  }
  async forgotPassword(email: string) {
    const response = await this.post("/api/auth/forgot-password", { email });
    return response;
  }
  async resetPassword(token: string, password: string) {
    const response = await this.post("/api/auth/reset-password", {
      token,
      password,
    });
    return response;
  }
}
export const authService = new AuthService();
