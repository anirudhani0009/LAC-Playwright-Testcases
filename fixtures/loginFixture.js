const base = require("@playwright/test");
const { expect } = base;
const Login = require("../pages/loginpage.js");

const test = base.test.extend({
    goToLogin: async ({ page }, use) => {
        const login = new Login(page);

        // Log in once before each test and confirm that the homepage is ready.
        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({ timeout: 3000 });
        
        // Pass the login instance forward
        await use({login});
    }
});

// Export this custom test runner so other fixtures or specs can use it
module.exports = { test, expect };