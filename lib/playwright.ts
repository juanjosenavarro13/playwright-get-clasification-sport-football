import fs from "fs";
import { Browser, BrowserContext, chromium, Page } from "playwright";
import { Utils } from "./utils";
import UserAgent from "user-agents";
import { ScreenShoot } from "./screenShoot";
import path from "path";

export class Playwright {
  private videosFolder: string;
  constructor() {
    this.videosFolder = "media/videos/";
  }
  async start() {
    const userAgent = new UserAgent();
    const randomUserAgent = userAgent.toString();
    console.log("generado random agent", randomUserAgent);
    const browser: Browser = await chromium.launch({ headless: true });
    const context: BrowserContext = await browser.newContext({
      userAgent: randomUserAgent,
      // recordVideo: { dir: this.videosFolder },
      // ignoreHTTPSErrors: true,
    });
    const page: Page = await context.newPage();
    const utils = new Utils(context, browser);
    const screenShoot = new ScreenShoot(page, this.videosFolder);
    this.createFolders();
    return { page, utils, screenShoot };
  }

  private createFolders() {
    const mediaDir = "media";
    const subdirs = ["screenshoots", "videos", "data"];

    if (process.env.deleteMedia) {
      fs.rmSync(mediaDir, { recursive: true });
      console.log("carpeta media/* eliminada");
    }

    subdirs.forEach((subdir) => {
      const dirPath = path.join(mediaDir, subdir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Carpeta creada: ${dirPath}`);
      } else {
        console.log(`Carpeta ${dirPath} ya existe`);
      }
    });
  }
}
