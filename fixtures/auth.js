//Import the custom goToLogin fixture runner, NOT the default base test!
const { test: loginTest, expect } = require("./loginFixture.js");
const Home = require("../pages/homepage.js");
const LoginData = JSON.parse(JSON.stringify(require("../assets/lac-loginCred.json")));

// Creates a reusable authenticated context for tests that start on the homepage.
const test = loginTest.extend({
    auth: async ({ page, goToLogin }, use) => {
        // goToLogin is available here because we extended loginTest
        const { login } = goToLogin;
        const home = new Home(page);

        /*// Log in once before each test and confirm that the homepage is ready.
        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({ timeout: 3000 }); */
        await login.signinToApplication(LoginData.username, LoginData.password);
        await expect(page.locator(login.signinButton)).not.toBeVisible();
        await expect(home.cart).toBeVisible({ timeout: 3000 });
        await expect(home.manageButton).toBeVisible({ timeout: 3000 });
        await expect(home.breadCrumbsBtn).toBeVisible({ timeout: 3000 });

        // Expose both page objects so each test can focus on its scenario.
        await use({ login, home });
    }
});

module.exports = { test, expect };
