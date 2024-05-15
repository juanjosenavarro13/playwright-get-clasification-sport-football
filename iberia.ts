import { Frame, Page } from "playwright";

export class Iberia {
  private url: string;
  constructor(private readonly page: Page) {
    this.url = process.env.url ?? "https://www.iberia.com/";
  }

  async openHome() {
    await this.page.goto(this.url).then(() => {
      console.log(`Cargado ${this.url}`);
    });
    await this.acceptCookies();
  }

  async login() {
    const selectorButtonLoginPopup =
      "#publicUser > a.ibe-header-new__link.ibe-header-new__link-icon.icon-perfil_login.visible-lg-inline-block.visible-xl-inline-block.hidden-xs.hidden-sm.hidden-md";
    const buttonLoginPopup = await this.page.waitForSelector(selectorButtonLoginPopup);
    await buttonLoginPopup?.click().finally(() => {
      console.log("Desplegado popup login");
    });

    const selectorIframeLogin = 'iframe[data-cy="login-home"]';
    await this.page.waitForSelector(selectorIframeLogin);

    const iframe = await this.page.$(selectorIframeLogin);
    const iframeContent = await iframe?.contentFrame().finally(() => {
      console.log("Iframe desplegado");
    });
    if (!iframeContent) throw new Error("Contenido del iframe no disponible");

    if (!process.env.email || !process.env.password) throw new Error("email y/o contraseñas invalidos");
    await this.writeInputLogin(iframeContent, "#loginPage\\:theForm\\:loginEmailInput", process.env.email);
    await this.writeInputLogin(iframeContent, "#loginPage\\:theForm\\:loginPasswordInput", process.env.password);

    await this.buttonLogin(iframeContent);
  }

  private async buttonLogin(iframeContent: Frame) {
    const buttonLoginSelector = "#loginPage\\:theForm\\:loginSubmit";
    await iframeContent?.waitForSelector(buttonLoginSelector, { state: "visible" });
    const buttonLogin = await iframeContent?.$(buttonLoginSelector);
    await buttonLogin?.click().finally(() => {
      console.log("Click en iniciar sesion");
    });
  }

  private async writeInputLogin(iframeContent: Frame, selector: string, value: string) {
    await iframeContent?.waitForSelector(selector);
    const inputEmail = await iframeContent?.$(selector);
    await inputEmail?.fill(value).finally(() => {
      console.log(`Escrito en el input login ${value}`);
    });
  }

  private async acceptCookies() {
    await this.page.waitForLoadState("networkidle");
    const selectorButtonCookie = "#onetrust-accept-btn-handler";
    this.page.waitForSelector(selectorButtonCookie);
    const buttonCookies = await this.page.$(selectorButtonCookie);
    await buttonCookies?.click().finally(() => {
      console.log("Click en boton para aceptar cookies");
    });
  }
}
