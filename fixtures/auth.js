const base = require("@playwright/test");
const { expect } = base;
const Login = require("../pages/loginpage.js");
const Home = require("../pages/homepage.js");
const LoginData = JSON.parse(JSON.stringify(require("../assets/lac-loginCred.json")));

const test = base.test.extend({
    auth: async ({ page }, use) => {
        const login = new Login(page);
        const home = new Home(page);

        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({ timeout: 3000 });
        await login.signinToApplication(LoginData.username, LoginData.password);
        await expect(page.locator(login.signinButton)).not.toBeVisible();
        await expect(home.cart).toBeVisible({ timeout: 3000 });
        await expect(home.manageButton).toBeVisible({ timeout: 3000 });
        await expect(home.breadCrumbsBtn).toBeVisible({ timeout: 3000 });

        await use({ login, home });
    }
});

module.exports = { test, expect };
