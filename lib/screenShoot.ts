import fs from "fs";
import { Page } from "playwright";

type validFormatImage = "jpg" | "png";

export class ScreenShoot {
  private countScreenShoot: number;
  private screenShootFolder: string;
  constructor(private readonly page: Page, private readonly videosFolder: string) {
    this.countScreenShoot = 1;
    this.screenShootFolder = "media/screenshoots";
  }

  async take({ name, formatImage = "jpg" }: { name?: string; formatImage?: validFormatImage } = {}) {
    const screenshotName = name ?? this.countScreenShoot.toString();
    const screenshotPath = `${this.screenShootFolder}/${screenshotName}.${formatImage}`;

    await this.page.screenshot({ path: screenshotPath });
    this.countScreenShoot++;
  }
}
