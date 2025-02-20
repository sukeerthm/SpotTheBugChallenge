import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { regstrationTab } from '../pages/registrationTab';


export class registrationForm extends regstrationTab {
    
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

      //Fill the form with Test Data from JSON file
      async fillTheFormUsingJsonData(json: Record<string, any>) {
        console.log(json)
        await this.enterFirstname(json.firstname);
        await this.enterLastname(json.lastname);
        await this.enterPhone(json.phonenumber);
        await this.enterEmail(json.emailaddress);
        await this.enterPassword(json.password);
      }

    //   async skipTheSpecificField(fieldToSkip : string) {
    //     if(!fieldToSkip.match('FirstName')) {
    //         await this.enterFirstname(faker.person.firstName());
    //     }
    //     else if(!fieldToSkip.match('lastName')) {
    //         await this.enterLastname(faker.person.lastName());
    //     }
    //     else if(!fieldToSkip.match('emailAddress')){
    //         await this.enterEmail(faker.internet.email());
    //     }
    //     else if(!fieldToSkip.match('phoneNumber')){
    //         await this.enterPhone(faker.helpers.fromRegExp('02[0-9]{10}'));
    //     }
    //     else if(!fieldToSkip.match('password')) {
    //         await this.enterPassword(faker.internet.password({length:10}));
    //     }
    //   }
    
      //Validate Error Messages for each field on the form

      async acceptTermsAndConditions(){
        await this.termsAndCondition.click();
       }


      async submitTheForm(){
        await this.registerButton.click();
       }

       async getAlertText() : Promise<string>{
        return await this.successfulMessage.innerText();
       }

       async getFirstNameResults() : Promise<string>{
        const actualFN: string[] = (await this.resultFirstName.innerText()).split(':');
        return actualFN[1].trim();
       }
       
       async getLastNameResults() : Promise<string>{
        const actualLN: string[] = (await this.resultLastName.innerText()).split(':');
        return actualLN[1].trim();
       }

       async getEmailAddressResults() : Promise<string>{
        const actualEmailAddress: string[] = (await this.resultEmailAddress.innerText()).split(':');
        return actualEmailAddress[1].trim();
       }

       async getPhoneNumberResults() : Promise<string>{
        const actualPhoneNum: string[] = (await this.resultPhoneNumber.innerText()).split(':');
        return actualPhoneNum[1].trim();
       }

       async getFirstNameInputValue() : Promise<string>{
        return await this.firstName.inputValue()
       }

       async getLastNameInputValue(): Promise<string>{
        return await this.lastName.inputValue()
       }

       async getEmailInputValue(): Promise<string>{
        return await this.emailAddress.inputValue()
       }

       async getPhoneInputValue(): Promise<string>{
        return await this.phoneNumber.inputValue()
       }

    //    async getCountryResults() {
    //     const result: string[] = (await this.resultFirstName.innerText()).split(':');
    //     console.log(result)
    //    }
}