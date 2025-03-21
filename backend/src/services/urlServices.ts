import { PrismaClient } from "@prisma/client";
class UrlService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async generateShortUrl(original: string, userId: string) {
    const shortCode = Math.random().toString(36).substring(2, 8);
    return this.prisma.shortURL.create({
      data: { original, shortCode, user: { connect: { id: userId } } },
    });
  }
  async getOriginalUrl(shortCode: string) {
    return this.prisma.shortURL.findUnique({ where: { shortCode } });
  }
  async incrementClickCount(shortCode: string) {
    const url = await this.getOriginalUrl(shortCode);
    if (url) {
      return this.prisma.shortURL.update({
        where: { shortCode },
        data: { clicks: url.clicks + 1 },
      });
    }
    return null;
  }
  async getStats(shortCode: string) {
    return this.prisma.shortURL.findUnique({
      where: { shortCode },
      select: {
        id: true,
        original: true,
        shortCode: true,
        clicks: true,
        createdAt: true,
        userId: true,
      },
    });
  }
}
export default new UrlService();
