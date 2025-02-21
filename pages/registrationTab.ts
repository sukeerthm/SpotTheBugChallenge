import { expect, type Locator, type Page } from '@playwright/test';

//Class to capture all the locator details realted to CONTACT page
export abstract class regstrationTab {

  readonly page: Page;
  readonly formHeader: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly emailAddress : Locator;
  readonly phoneNumber: Locator;
  readonly countryList : Locator;
  readonly countryListOptions : Locator;
  readonly password : Locator;
  readonly termsAndCondition : Locator;
  readonly registerButton : Locator;
  readonly successfulMessage : Locator;

  readonly header_error: Locator;
  readonly lastname_error: Locator;
  readonly email_error: Locator;
  readonly phone_error: Locator;
  readonly password_error: Locator;

  readonly resultFirstName : Locator;
  readonly resultLastName : Locator;
  readonly resultPhoneNumber : Locator;
  readonly resultEmailAddress : Locator;
  readonly resultCountry : Locator;

  //Page Titles and Messages
  readonly header_text = "CHALLENGE - Spot the BUGS!";
  readonly successfulMessage_text = "Successfully registered the following information";
   readonly phone_length_error_text = "The phone number should contain at least 10 characters!";
  readonly password_length_error_text = "The password should contain between [6,20] characters!";
  

   constructor(page: Page) {
    this.page = page;

    //Locator details 
    this.formHeader = page.locator("//h2");
    this.firstName = page.getByPlaceholder('Enter first name');
    this.lastName = page.getByPlaceholder('Enter last name');
    this.phoneNumber = page.getByPlaceholder('Enter phone number');
    this.emailAddress = page.getByPlaceholder('Enter email');
    this.countryList = page.locator('#countries_dropdown_menu');
    this.countryListOptions = page.locator("//select[@id='countries_dropdown_menu']/option");
    this.password = page.getByPlaceholder('Password');
    this.termsAndCondition = page.locator('#exampleCheck1');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.successfulMessage = page.locator('div#message');


    //Locator details for results
    this.resultFirstName = page.locator('#resultFn');
    this.resultLastName = page.locator('#resultLn');
    this.resultPhoneNumber = page.locator('#resultPhone');
    this.resultEmailAddress = page.locator('#resultEmail');
    this.resultCountry = page.locator('#country');
    
  }


  async enterFirstname(firstname: string) {
   await this.firstName.fill(firstname);
  }

  async enterLastname(familyname: string) {
    await this.lastName.fill(familyname)
  }

  async enterEmail(useremail: string) {
    await this.emailAddress.fill(useremail)
  }

  async enterPhone(userPhoneNum: string) {
    await this.phoneNumber.fill(userPhoneNum);
  }

  async enterPassword(userPassword: string) {
    await this.password.fill(userPassword);
  }

  



}