//Import the custom goToLogin fixture runner, NOT the default base test!
const { test: loginTest, expect } = require("./loginFixture.js");
const Signup = require("../pages/signup.js");

const test = loginTest.extend({
    goToSignUp: async ({ page, goToLogin }, use) => {
        const { login } = goToLogin;
        const signup = new Signup(page);
        // Navigate from login page to signup page and verify it loaded.
        await login.navigateToSignUp();
        await expect(page.locator(signup.signupHeader)).toBeVisible({ timeout: 3000 });

        // Expose both page objects so each test can focus on its scenario.
        await use({login, signup});
    }

});
// Export this custom test runner so other fixtures or specs can use it
module.exports = { test, expect };