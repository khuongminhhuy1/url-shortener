import AxiosServices from "./AxiosServices";

class UrlService extends AxiosServices {
  async shortenUrl(url: string): Promise<{ short: string }> {
    const response = await this.post("/api/url/shorten", { original: url });
    return response.data;
  }

  async getUrlStats(shortCode: string): Promise<{ clicks: number }> {
    const response = await this.get(`/api/url/stats/${shortCode}`);
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
    return response;
  }
  async logout() {
    const response = await this.post("/api/auth/logout", {});
    return response;
  }
  async verifySession() {
    const response = await this.get("/api/auth/verify-session");
    return response;
  }
}
export const authService = new AuthService();
