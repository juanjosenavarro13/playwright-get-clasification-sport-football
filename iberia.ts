import { Page } from "playwright";

export class Iberia {
  private page: Page;
  private url: string;
  constructor(page: Page) {
    this.page = page;
    this.url = "https://www.iberia.com/";
  }

  async home() {
    await this.page.goto(this.url);
  }
}
