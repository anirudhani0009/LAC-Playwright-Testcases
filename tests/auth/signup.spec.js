
const { test, expect } = require("../../fixtures/signupFixture.js");
const LoginData = JSON.parse(JSON.stringify(require("../../assets/lac-loginCred.json")));

// Test suite for the signup page flow.
test.describe("LAC Signup Page", () => {

    test("Filling and checking Sign Up with Valid details", async ({page, goToSignUp:{signup}}) => {
        // Fill the signup form with valid test data.
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillState();
        await signup.signUpFillHobbies();

        // Verify that the signup button remains enabled after filling the form.
        await expect(page.locator(signup.signupButton)).toBeEnabled();
    });

    test("Filling and checking Sign Up without entering name", async ({page, goToSignUp:{signup}}) => {
        // Fill the signup form with valid test data.
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillState();
        await signup.signUpFillHobbies();

        // Verify that the signup button remains enabled after filling the form.
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });

    test("Filling and checking Sign Up without entering email", async ({page, goToSignUp:{signup}}) => {
        // Fill the signup form with valid test data.
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillState();
        await signup.signUpFillHobbies();

        // Verify that the signup button remains enabled after filling the form.
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });

    test("Filling and checking Sign Up without entering password", async ({page, goToSignUp:{signup}}) => {
        // Fill the signup form with valid test data.
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillState();
        await signup.signUpFillHobbies();

        // Verify that the signup button remains enabled after filling the form.
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });


    test("Filling and checking Sign Up without checking interests box", async ({page, goToSignUp:{signup}}) => {
        // Fill the signup form with valid test data.
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillGender();
        await signup.signUpFillState();
        await signup.signUpFillHobbies();

        // Verify that the signup button remains enabled after filling the form.
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });


    test("Filling and checking Sign Up without slecting states", async ({page, goToSignUp:{signup}}) => {
        // Fill the signup form with valid test data.
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillHobbies();

        // Verify that the signup button remains enabled after filling the form.
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });
    

    test("Filling and checking Sign Up without slecting hobbies", async ({page, goToSignUp:{signup}}) => {
        // Fill the signup form with valid test data.
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillState();

        // Verify that the signup button remains enabled after filling the form.
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });

    test("Checking the Login link in Signup page", async ({page, goToSignUp:{signup, login}}) => {

        await signup.loginLink();
        await expect(page.locator(login.header)).toBeVisible({timeout: 3000});

    });

});