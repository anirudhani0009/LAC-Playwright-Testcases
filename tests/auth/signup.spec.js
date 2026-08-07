const { test, expect } = require("@playwright/test");
const Login = require("../../pages/loginpage.js");
const Signup = require("../../pages/signup.js");
const { describe } = require("node:test");
const LoginData = JSON.parse(JSON.stringify(require("../../assets/lac-loginCred.json")));

test.describe("LAC Signup Page", () => {
    let login;
    let signup;
    test.beforeEach(async ({page}) => {
        login = new Login(page);
        signup = new Signup(page);

        login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({timeout: 3000});

        login.navigateToSignUp();
        await expect(page.locator(signup.header)).toBeVisible({timeout: 3000});
    });

    test("Filling and checking Sign Up with Valid details", async ({page}) => {
        await signup.signupFill(LoginData.signupname, LoginData.fakeusername, LoginData.fakepassword);
        await expect(page.locator(signup.signupButton)).toBeEnabled();
    });
});