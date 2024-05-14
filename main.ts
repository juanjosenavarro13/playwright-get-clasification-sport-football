import { Iberia } from "./iberia";
import { Playwright } from "./lib";

(async () => {
  const playwright = new Playwright();
  const { page, utils, screenShoot } = await playwright.start();

  const iberia = new Iberia(page);

  await iberia.openHome();
  await iberia.login();

  await screenShoot.take();
  await utils.close();
})();
