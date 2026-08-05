const { test, expect } = require("@playwright/test");
const Login = require("../../pages/loginpage.js");
const Home = require("../../pages/homepage.js");
const LoginData = JSON.parse(JSON.stringify(require("../../assets/lac-loginCred.json")));

test.describe("LAC Login Page", () => {
    let login;
    let home;

    test.beforeEach(async ({ page }) => {
        login = new Login(page);
        home = new Home(page);

        await login.navigate();
    });

    test("Sign in with correct credentials", async ({ page }) => {
        await login.signinToApplication(LoginData.username, LoginData.password);
        await expect(page.locator(login.signinButton)).not.toBeVisible();
        await expect(page.locator(home.manageButton)).toBeVisible({ timeout: 5000 });
    });
});

