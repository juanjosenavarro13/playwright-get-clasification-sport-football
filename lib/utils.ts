import fs from "fs";
import { Browser, BrowserContext, Page } from "playwright";

export class Utils {
  private context: BrowserContext;
  private browser: Browser;
  private page: Page;
  private screenShootFolder: string;
  constructor(context: BrowserContext, browser: Browser, page: Page) {
    this.context = context;
    this.browser = browser;
    this.page = page;
    this.screenShootFolder = "screenshoots";
    this.removeScreenShootFolder();
  }

  async screenShoot(name: string) {
    await this.page.screenshot({
      path: `${this.screenShootFolder}/${name}.jpg`,
    });
  }

  async close() {
    await this.context.close();
    await this.browser.close();
  }

  private removeScreenShootFolder() {
    fs.rm(this.screenShootFolder, { recursive: true }, () => {});
  }
}
