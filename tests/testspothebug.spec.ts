import { test, expect } from '@playwright/test';
import { homePage } from '../pages/homepage';
import { registrationForm } from '../implementation/registrationFormValidation';
import { userDetailsFromJson } from '../testdata/userDetailsToFillTheForm.json';


let homepage:any;
let regform:any;

test.beforeEach(async ({ page }) => {
    //Declare all the page objects and open Jupiter webpage
    homepage= new homePage(page);
    regform= new registrationForm(page);
    await page.goto('/'); 
    await homepage.clickRegistrationTab();  
  });



 //Below are Test Cases for Bugs
  
  //FirstName
  const noLastName = 
    { "firstname": "Marry", 
      "lastname": "" ,
      "phonenumber":"02000000000",
      "emailaddress":"marryclar0987676@test.com",
      "password":"Test123" 
    }
  test ('Validate Last Name is mandatory to register', async ({ page }) => {
    await regform.fillTheFormUsingJsonData(noLastName);
    await regform.submitTheForm() 
    expect(await regform.getAlertText()).toEqual(await regform.lastName_expectedError);
    
 });

 const noPhoneNumber = 
 { "firstname": "Marry", 
   "lastname": "Larry" ,
   "phonenumber":"",
   "emailaddress":"marryclar0987676@test.com",
   "password":"Test123" 
 }
test ('Validate Phone Number is mandatory to register', async ({ page }) => {
await regform.fillTheFormUsingJsonData(noPhoneNumber);
await regform.submitTheForm() 
expect(await regform.getAlertText()).toEqual(await regform.phoneNumber_expectedError);
});

const alphabetsInPhoneNumber = 
 { "firstname": "Marry", 
   "lastname": "Larry" ,
   "phonenumber":"ABCDEFGHIJKL",
   "emailaddress":"marryclar0987676@test.com",
   "password":"Test123" 
 }
test ('Validate Phone Number field only accepts DIGITS', async ({ page }) => {
await regform.fillTheFormUsingJsonData(alphabetsInPhoneNumber);
await regform.submitTheForm() 
expect(await regform.getAlertText()).not.toEqual(await regform.successfulMessage_text);
});

 const noEmail = 
 { "firstname": "Marry", 
   "lastname": "Larry" ,
   "phonenumber":"1234567890",
   "emailaddress":"",
   "password":"Test123" 
 }
 test ('Validate Email Address is mandatory', async ({ page }) => {
  await regform.fillTheFormUsingJsonData(noEmail);
  await regform.submitTheForm() 
  expect(await regform.getAlertText()).toEqual(await regform.emailAddress_expectedError);
  
 });

 const noPassword = 
 { "firstname": "Marry", 
   "lastname": "Larry" ,
   "phonenumber":"1234567890",
   "emailaddress":"test@test.com",
   "password":"" 
 }
 test ('Validate password is mandatory', async ({ page }) => {

  await regform.fillTheFormUsingJsonData(noPassword);
    await regform.submitTheForm() 
    expect(await regform.getAlertText()).toEqual(await regform.password_expectedError);
 });

 const termsCondCheckbox = 
 { "firstname": "Marry", 
  "lastname": "Larry" ,
  "phonenumber":"1234567890",
  "emailaddress":"test.com",
  "password":"123456789012" 
}
 test ('Validate User Can accept Terms and Conditions', async ({ page }) => {

  await regform.fillTheFormUsingJsonData(termsCondCheckbox);
  expect(await regform.termsAndCondition).toBeEnabled();
 });


 const dataToCompareResults = 
{ "firstname": "Marry", 
  "lastname": "Larry" ,
  "phonenumber":"1234567890",
  "emailaddress":"test.com",
  "password":"123456789012" 
}
test.describe('Registration and Verify the details', () => {

  test ('Validate registration is successfull', async ({ page }) => {

    await regform.fillTheFormUsingJsonData(dataToCompareResults);
      await regform.submitTheForm() 
      expect(await regform.getAlertText()).toEqual(await regform.successfulMessage_text);
   });
  
  test ('Validate Firstname from the results after registration', async ({ page }) => {

 await regform.fillTheFormUsingJsonData(dataToCompareResults);
   await regform.submitTheForm() 
   expect(await regform.getFirstNameResults()).toEqual(dataToCompareResults.firstname);
});


test ('Validate LastName from the results after registration', async ({ page }) => {

 await regform.fillTheFormUsingJsonData(dataToCompareResults);
   await regform.submitTheForm() 
   expect(await regform.getLastNameResults()).toEqual(dataToCompareResults.lastname);
});

test ('Validate EMailAddress from the results after registration', async ({ page }) => {

 await regform.fillTheFormUsingJsonData(dataToCompareResults);
   await regform.submitTheForm() 
   expect(await regform.getEmailAddressResults()).toEqual(dataToCompareResults.emailaddress);
});

test ('Validate User is entering email in proper format', async ({ page }) => {
  
  await regform.fillTheFormUsingJsonData(dataToCompareResults);
    await regform.submitTheForm() 
    expect(await regform.getEmailAddressResults()).toMatch(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
 });

test ('Validate phoneNumber from the results after registration', async ({ page }) => {

 await regform.fillTheFormUsingJsonData(dataToCompareResults);
   await regform.submitTheForm() 
   expect(await regform.getPhoneNumberResults()).toEqual(dataToCompareResults.phonenumber);
});

});



const specialCharValidation = 
{ "firstname": "Marry&%^$#", 
  "lastname": "#$%$Larry" ,
  "phonenumber":"%$^$567890",
  "emailaddress":"#%^test.com",
  "password":"123456789012" 
}
test.describe('Validate Fields should not accept special characters', () => {

  
  test ('Validate First Name should not accept special characters', async ({ page }) => {

 await regform.fillTheFormUsingJsonData(specialCharValidation);
   await regform.submitTheForm() 
   expect.soft(await regform.getFirstNameInputValue()).toMatch(/^[a-zA-Z0-9]$/);
   expect.soft(await regform.getFirstNameResults()).toMatch(/^[a-zA-Z0-9]$/);
});


test ('Validate last name should not accept special characters', async ({ page }) => {

 await regform.fillTheFormUsingJsonData(specialCharValidation);
   await regform.submitTheForm() 
   expect.soft(await regform.getLastNameInputValue()).toMatch(/^[a-zA-Z0-9]$/);
   expect.soft(await regform.getLastNameResults()).toMatch(/^[a-zA-Z0-9]$/);
});

test ('Validate email address should not accept special characters', async ({ page }) => {

 await regform.fillTheFormUsingJsonData(specialCharValidation);
   await regform.submitTheForm() 
   expect.soft(await regform.getEmailInputValue()).toMatch(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
   expect.soft(await regform.getEmailAddressResults()).toMatch(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
});


test ('Validate phone number should not accept special characters', async ({ page }) => {

 await regform.fillTheFormUsingJsonData(specialCharValidation);
   await regform.submitTheForm() 
   expect.soft(await regform.getPhoneNumberResults()).toMatch(/^[0-9]$/);
   expect.soft(await regform.getPhoneNumberResults()).toMatch(/^[0-9]$/);
});

});

 //  test ('Validate selected country is reflecting on the screen', async ({ page }) => {

  
//  });


 const phoneLength9 = 
 { "firstname": "Marry", 
   "lastname": "Larry" ,
   "phonenumber":"123456789",
   "emailaddress":"marryclar0987676@test.com",
   "password":"Test123" 
 }
 test ('Validate Phone Number is not accepted if legnth is < 10 digits', async ({ page }) => {

  await regform.fillTheFormUsingJsonData(phoneLength9);
    await regform.submitTheForm() // Submit the form with out lastName
    expect(await regform.getAlertText()).not.toEqual(await regform.successfulMessage_text);
 });
 

 const passwordLen5 = 
 { "firstname": "Marry", 
   "lastname": "Larry" ,
   "phonenumber":"1234567890",
   "emailaddress":"test@test.com",
   "password":"12345" 
 }
 test ('Validate password is not accepted if length is < 6 characters', async ({ page }) => {
  await regform.fillTheFormUsingJsonData(passwordLen5);
  await regform.submitTheForm() // Submit the form with out lastName
  expect(await regform.getAlertText()).not.toEqual(await regform.successfulMessage_text);
  expect(await regform.getAlertText()).toEqual(await regform.password_length_error_text);
  
 });

 const passwordLen21 = 
 { "firstname": "Marry", 
   "lastname": "Larry" ,
   "phonenumber":"1234567890",
   "emailaddress":"test@test.com",
   "password":"123456789012345678901" 
 }
 test ('Validate password is not accepted if length is > 20 characters', async ({ page }) => {

  await regform.fillTheFormUsingJsonData(passwordLen21);
    await regform.submitTheForm() // Submit the form with out lastName
    expect(await regform.getAlertText()).not.toEqual(await regform.successfulMessage_text);
    expect(await regform.getAlertText()).toEqual(await regform.password_length_error_text);
 });


//  test ('Validate User can accept the terms and conditions', async ({ page }) => {

  
//  });

test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`${testInfo.title} did not run as expected!`);
  });
