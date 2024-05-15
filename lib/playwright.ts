import { Browser, BrowserContext, chromium, Page } from "playwright";
import { Utils } from "./utils";
import UserAgent from "user-agents";
import { ScreenShoot } from "./screenShoot";

export class Playwright {
  private videosFolder: string;
  constructor() {
    this.videosFolder = "media/videos/";
  }
  async start() {
    const userAgent = new UserAgent();
    const randomUserAgent = userAgent.toString();
    console.log("generado random agent", randomUserAgent);
    const browser: Browser = await chromium.launch({ headless: false });
    const context: BrowserContext = await browser.newContext({
      userAgent: randomUserAgent,
      recordVideo: { dir: this.videosFolder },
      ignoreHTTPSErrors: true,
    });
    const page: Page = await context.newPage();
    const utils = new Utils(context, browser);
    const screenShoot = new ScreenShoot(page, this.videosFolder);
    return { page, utils, screenShoot };
  }
}
