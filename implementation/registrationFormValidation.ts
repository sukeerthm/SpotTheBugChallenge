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
        await this.enterFirstname(json.firstname);
        await this.enterLastname(json.lastname);
        await this.enterPhone(json.phonenumber);
        await this.countryList.selectOption(json.countryname);
        await this.enterEmail(json.emailaddress);
        await this.enterPassword(json.password);
      }

      async validateUserCanSelectAnyCountry(countryName : string) {
          await this.enterFirstname(faker.person.firstName());
          await this.enterLastname(faker.person.lastName());
          await this.enterEmail(faker.internet.email())
          await this.enterPhone(faker.helpers.fromRegExp('02[0-9]{10}'));
          await this.enterPassword(faker.internet.password({length:10}));
          await this.countryList.selectOption(countryName);
        }
    
        async getCountryCount() : Promise<number>{
          await this.countryList.click();
        return await this.countryListOptions.count();
        
        }
           
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

       async getCountryResults() : Promise<string>{
        const actualCountryName: string[] = (await this.resultCountry.innerText()).split(':');
        return actualCountryName[1].trim();
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

       async getCountryToSelect(index : number): Promise<string>{
        return await this.countryListOptions.nth(index).innerText();
       }


       async getErrorMessage(fieldName : string): Promise<Locator>{

        let isErrorVisible; 
        if(fieldName == 'phonenumber'){

          isErrorVisible = this.page.getByText(this.phone_length_error_text);

        } else if (fieldName == 'password'){

          isErrorVisible = this.page.getByText(this.password_length_error_text);
        }
        
        return await isErrorVisible;
       }

}