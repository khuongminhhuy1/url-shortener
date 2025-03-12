import AxiosServices from "./AxiosServices";

export class UrlService extends AxiosServices {
  async shortenUrl(url: string): Promise<{ short: string }> {
    const response = await this.post("/api/url/shorten", { original: url });
    return response.data;
  }

  async getUrlStats(shortCode: string): Promise<{ clicks: number }> {
    const response = await this.get(`/api/url/stats/${shortCode}`);
    return response.data;
  }
}

export default new UrlService();
