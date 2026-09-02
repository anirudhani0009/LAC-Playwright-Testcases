
const { test, expect } = require("../../fixtures/signupFixture.js");
const LoginData = require("../../assets/lac-loginCred.json");

// Test suite: Validates signup page form fields and their requirements
// Covers: complete signup flow, individual field validation, required field checks, navigation
test.describe("LAC Signup Page", () => {

    test("Filling and checking Sign Up with Valid details", async ({page, goToSignUp:{signup}}) => {
        // SCENARIO: User fills out entire signup form with all required information
        // EXPECTED: All fields are populated and signup button becomes enabled
        
        // Fill in all form fields with valid test data
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillState();
        await signup.signUpFillHobbies();

        // Verify signup button is enabled (all required fields are filled)
        await expect(page.locator(signup.signupButton)).toBeEnabled();
    });

    test("Filling and checking Sign Up without entering name", async ({page, goToSignUp:{signup}}) => {
        // SCENARIO: User submits signup form without entering name (required field)
        // EXPECTED: Signup button remains disabled since name is required
        
        // Fill all fields EXCEPT name
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillState();
        await signup.signUpFillHobbies();

        // Verify signup button is disabled (name is a required field)
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });

    test("Filling and checking Sign Up without entering email", async ({page, goToSignUp:{signup}}) => {
        // SCENARIO: User submits signup form without entering email (required field)
        // EXPECTED: Signup button remains disabled since email is required
        
        // Fill all fields EXCEPT email
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillState();
        await signup.signUpFillHobbies();

        // Verify signup button is disabled (email is a required field)
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });

    test("Filling and checking Sign Up without entering password", async ({page, goToSignUp:{signup}}) => {
        // SCENARIO: User submits signup form without entering password (required field)
        // EXPECTED: Signup button remains disabled since password is required
        
        // Fill all fields EXCEPT password
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillState();
        await signup.signUpFillHobbies();

        // Verify signup button is disabled (password is a required field)
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });

    test("Filling and checking Sign Up without checking interests box", async ({page, goToSignUp:{signup}}) => {
        // SCENARIO: User submits signup form without selecting interests (required checkbox)
        // EXPECTED: Signup button remains disabled since interests selection is required
        
        // Fill all fields EXCEPT interests
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillGender();
        await signup.signUpFillState();
        await signup.signUpFillHobbies();

        // Verify signup button is disabled (interests is a required selection)
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });

    test("Filling and checking Sign Up without slecting states", async ({page, goToSignUp:{signup}}) => {
        // SCENARIO: User submits signup form without selecting state (required dropdown field)
        // EXPECTED: Signup button remains disabled since state selection is required
        
        // Fill all fields EXCEPT state selection
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillHobbies();

        // Verify signup button is disabled (state is a required dropdown selection)
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });

    test("Filling and checking Sign Up without slecting hobbies", async ({page, goToSignUp:{signup}}) => {
        // SCENARIO: User submits signup form without selecting hobbies (required checkboxes)
        // EXPECTED: Signup button remains disabled since hobbies selection is required
        
        // Fill all fields EXCEPT hobbies
        await signup.signUpFillName(LoginData.signupname);
        await signup.signUpFillEmail(LoginData.fakeusername);
        await signup.signUpFillPassword(LoginData.fakepassword);
        await signup.signUpFillInterests();
        await signup.signUpFillGender();
        await signup.signUpFillState();

        // Verify signup button is disabled (hobbies is a required selection)
        await expect(page.locator(signup.signupButton)).not.toBeEnabled();
    });

    test("Checking the Login link in Signup page", async ({page, goToSignUp:{signup, login}}) => {
        // SCENARIO: User clicks the login link on signup page
        // EXPECTED: Navigation returns to login page

        // Click the login link/button to navigate back to login page
        await signup.loginLink();
        
        // Verify successful navigation to login page by checking for login header
        await expect(page.locator(login.header)).toBeVisible({timeout: 3000});
    });

});