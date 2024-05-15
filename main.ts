import { ClasificacionLiga } from "./clasificacion-liga";
import { Playwright } from "./lib";
require("dotenv").config();

(async () => {
  const playwright = new Playwright();
  const { page, utils } = await playwright.start();

  await new ClasificacionLiga(page).start();

  await utils.close();
})();
