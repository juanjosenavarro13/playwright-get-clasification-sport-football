import { Iberia } from "./iberia";
import { Playwright } from "./lib/playwright";

(async () => {
  const playwright = new Playwright();
  const { page, utils } = await playwright.start();

  const iberia = new Iberia(page);
  await iberia.home();

  await utils.screenShoot("iberia-home");

  await utils.close();
})();
