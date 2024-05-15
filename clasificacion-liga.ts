import fs from "fs";
import { Page } from "playwright";

export class ClasificacionLiga {
  private clasification: Team[];
  constructor(private readonly page: Page) {
    this.clasification = [];
  }

  async start() {
    await this.page.goto("https://www.sport.es/resultados/futbol/primera-division/clasificacion-liga.html");
    await this.page.waitForLoadState("networkidle");
    await this.acceptCookies();
    await this.getClasificacion();
  }

  private async acceptCookies() {
    const buttonCookiesSelector = "#didomi-notice-agree-button > span";
    await this.page.waitForSelector(buttonCookiesSelector);
    const buttonCookies = await this.page.$(buttonCookiesSelector);
    await buttonCookies?.click();
  }

  private async getClasificacion() {
    const tableSelector =
      "#pagina > div.depcontenido > div:nth-child(1) > div.depcolumnaizda > div.table-ranking-container > table";
    await this.page.waitForSelector(tableSelector);
    const table = await this.page.$(tableSelector);

    const rows = await table?.$$("tbody tr");
    if (!rows) throw new Error("filas sin informacion");

    for (const row of rows) {
      const team = new Team();
      const teamPosition = await (await row.$$("td.table-ranking__team .table-ranking__position"))[0].innerText();
      const teamName = await (await row.$$("td.table-ranking__team .table-ranking__team-text"))[0].innerText();
      team.setPosition(teamPosition);
      team.setName(teamName);

      const cells = await row.$$("td.table-ranking-total");
      team.setPj(await cells[0].innerText());
      team.setPg(await cells[1].innerText());
      team.setPe(await cells[2].innerText());
      team.setPp(await cells[3].innerText());
      team.setPts(await cells[4].innerText());
      team.setGf(await cells[5].innerText());
      team.setGc(await cells[6].innerText());

      this.clasification.push(team.get());
    }

    fs.writeFile("media/data/clasificacion.json", JSON.stringify(this.clasification, null, 2), (err) => {
      if (err) {
        console.error("Error al escribir el archivo JSON", err);
      } else {
        console.log("Archivo JSON creado con éxito");
      }
    });
  }
}

export class Team {
  private position: string;
  private name: string;
  private pj: string;
  private pg: string;
  private pe: string;
  private pp: string;
  private pts: string;
  private gf: string;
  private gc: string;

  constructor() {
    this.position = "0";
    this.name = "";
    this.pj = "0";
    this.pg = "0";
    this.pe = "0";
    this.pp = "0";
    this.pts = "0";
    this.gf = "0";
    this.gc = "0";
  }

  setPosition(position: string) {
    this.position = position;
  }
  setName(name: string) {
    this.name = name;
  }
  setPj(pj: string) {
    this.pj = pj;
  }
  setPg(pg: string) {
    this.pg = pg;
  }
  setPe(pe: string) {
    this.pe = pe;
  }
  setPp(pp: string) {
    this.pp = pp;
  }
  setPts(pts: string) {
    this.pts = pts;
  }
  setGf(gf: string) {
    this.gf = gf;
  }
  setGc(gc: string) {
    this.gc = gc;
  }

  get() {
    return this;
  }
}
