import { expect, type Locator, type Page } from '@playwright/test';


//Class to capture all the locator details realted to HOME page
export class homePage {
  readonly page: Page;
  readonly registrationTab: Locator;


  constructor(page: Page) {
    this.page = page;
    //Locator Details
    this.registrationTab = page.locator('#bugs-form');
  }

  //Go to ContactForm
  async clickRegistrationTab() {
    await this.registrationTab.click()
  }
}
