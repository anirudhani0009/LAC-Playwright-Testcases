const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/loginpage.js");
const LoginData = JSON.parse(JSON.stringify(require("../../assets/lac-loginCred.json")));

test.describe("LAC Login Page", () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        await loginPage.navigate();
    });

    test("Sign in with correct credentials", async ({ page }) => {
        await loginPage.signinToApplication(LoginData.username, LoginData.password);
    });
});

