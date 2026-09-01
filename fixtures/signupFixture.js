//Import the custom goToLogin fixture runner, NOT the default base test!
// Signup fixture - extends loginFixture to navigate to signup page

const { test: loginTest, expect } = require("./loginFixture.js");
const Signup = require("../pages/signup.js");

const test = loginTest.extend({
    // Extends loginTest: login page setup + navigate to signup
    goToSignUp: async ({ page, goToLogin }, use) => {
        const { login } = goToLogin;
        const signup = new Signup(page);
        
        // Navigate from login page to signup page and verify it loaded
        await login.navigateToSignUp();
        await expect(page.locator(signup.signupHeader)).toBeVisible({ timeout: 3000 });

        // Pass both login and signup objects to test
        await use({login, signup});
    }

});
// Export this custom test runner so other fixtures or specs can use it
module.exports = { test, expect };