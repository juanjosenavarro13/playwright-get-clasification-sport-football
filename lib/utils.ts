import { Browser, BrowserContext } from "playwright";

export class Utils {
  constructor(private readonly context: BrowserContext, private readonly browser: Browser) {}

  async close() {
    await this.context.close();
    await this.browser.close();
  }
}
