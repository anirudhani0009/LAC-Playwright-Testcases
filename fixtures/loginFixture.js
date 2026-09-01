// Base fixture for login page setup
// Navigates to login page before each test that uses this fixture

const base = require("@playwright/test");
const { expect } = base;
const Login = require("../pages/loginpage.js");

const test = base.test.extend({
    // Fixture: Navigate to login page and verify it loaded
    goToLogin: async ({ page }, use) => {
        const login = new Login(page);

        // Navigate to login page and verify header is visible
        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({ timeout: 3000 });
        
        // Pass login object to test
        await use({login});
    }
});

// Export this custom test runner so other fixtures or specs can use it
module.exports = { test, expect };