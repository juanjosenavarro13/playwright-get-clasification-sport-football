import { Browser, BrowserContext, chromium, devices, Page } from "playwright";
import { Utils } from "./utils";

export class Playwright {
  async start() {
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext(
      devices["Desktop Chrome"]
    );
    const page: Page = await context.newPage();
    const utils = new Utils(context, browser, page);
    return { page, utils };
  }
}
