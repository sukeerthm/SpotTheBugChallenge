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
    await regform.submitTheForm() // Submit the form with out lastName
    expect(await regform.getAlertText()).not.toEqual(await regform.successfulMessage_text);
    
 });

 const noOhoneNumber = 
    { "firstname": "Marry", 
      "lastname": "Larry" ,
      "phonenumber":"",
      "emailaddress":"marryclar0987676@test.com",
      "password":"Test123" 
    }
 test ('Validate Phone Number is mandatory to register', async ({ page }) => {
  await regform.fillTheFormUsingJsonData(noOhoneNumber);
  await regform.submitTheForm() // Submit the form with out lastName
  expect(await regform.getAlertText()).not.toEqual(await regform.successfulMessage_text);
  
  
 });

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
 
 
//  test ('Validate selected country is reflecting on the screen', async ({ page }) => {

  
//  });

const noEmail = 
 { "firstname": "Marry", 
   "lastname": "Larry" ,
   "phonenumber":"1234567890",
   "emailaddress":"",
   "password":"Test123" 
 }
 test ('Validate Email Address is mandatory', async ({ page }) => {
  await regform.fillTheFormUsingJsonData(noEmail);
  await regform.submitTheForm() // Submit the form with out lastName
  expect(await regform.getAlertText()).not.toEqual(await regform.successfulMessage_text);
  
 });

//  test ('Validate User is entering email in proper format', async ({ page }) => {

  
//  });


const noPassword = 
 { "firstname": "Marry", 
   "lastname": "Larry" ,
   "phonenumber":"1234567890",
   "emailaddress":"test@test.com",
   "password":"" 
 }
 test ('Validate password is mandatory', async ({ page }) => {

  await regform.fillTheFormUsingJsonData(noPassword);
    await regform.submitTheForm() // Submit the form with out lastName
    expect(await regform.getAlertText()).not.toEqual(await regform.successfulMessage_text);
    expect(await regform.getAlertText()).toEqual(await regform.password_error_text);
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
  expect(await regform.getAlertText()).toEqual(await regform.password_error_text);
  
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
    expect(await regform.getAlertText()).toEqual(await regform.password_error_text);
 });


//  test ('Validate User can accept the terms and conditions', async ({ page }) => {

  
//  });
 

//Read the data from JSON file and submit the form for 5 different users
for (const detailsToFillForm of userDetailsFromJson) { 
  test(`TestCase 2 - User '${detailsToFillForm.firstname} ${detailsToFillForm.firstname}' can Submit the feedback form successfully`, async ({ page }) => {
    await homepage.clickRegistrationTab();  
    await regform.fillTheFormUsingJsonData(detailsToFillForm); //Fill the Form using details from JSON file
      await regform.submitTheForm() // Submit the form and validte the its successfull
      expect(test.info().status).toMatch(test.info().expectedStatus);
  });
  }


test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`${testInfo.title} did not run as expected!`);
  });

