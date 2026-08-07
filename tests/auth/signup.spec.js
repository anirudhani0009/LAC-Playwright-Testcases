const { test, expect } = require("@playwright/test");
const Login = require("../../pages/loginpage.js");
const Signup = require("../../pages/signup.js");
const LoginData = JSON.parse(JSON.stringify(require("../../assets/lac-loginCred.json")));

// Test suite for the signup page flow.
test.describe("LAC Signup Page", () => {
    let login;
    let signup;

    test.beforeEach(async ({page}) => {
        // Create page objects for login and signup.
        login = new Login(page);
        signup = new Signup(page);

        // Go to the login page and ensure the header is visible.
        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({timeout: 3000});

        // Navigate from login page to signup page and verify it loaded.
        await login.navigateToSignUp();
        await expect(page.locator(signup.signupHeader)).toBeVisible({timeout: 3000});
    });

    test("Filling and checking Sign Up with Valid details", async ({page}) => {
        // Fill the signup form with valid test data.
        await signup.signupFill(LoginData.signupname, LoginData.fakeusername, LoginData.fakepassword);
        // Verify that the signup button remains enabled after filling the form.
        await expect(page.locator(signup.signupButton)).toBeEnabled();
    });
});