//Import the custom goToLogin fixture runner, NOT the default base test!
// Authentication fixture - logs in user and navigates to homepage

const { test: loginTest, expect } = require("./loginFixture.js");
const Home = require("../pages/homepage.js");

// Creates a reusable authenticated context for tests that start on the homepage.
const test = loginTest.extend({
    // Extends loginTest: login page setup + authenticate user with credentials
    auth: async ({ page, goToLogin }, use) => {
        // goToLogin is available here because we extended loginTest
        const { login } = goToLogin;
        const home = new Home(page);

        // Perform login with credentials from JSON file
        await login.signinToApplication(process.env.LAC_USERNAME, process.env.LAC_PASSWORD);
        
        // Verify login was successful - check that homepage elements are visible
        await expect(page.locator(login.signinButton)).not.toBeVisible();
        await expect(home.cart).toBeVisible({ timeout: 3000 });
        await expect(home.manageButton).toBeVisible({ timeout: 3000 });
        await expect(home.breadCrumbsBtn).toBeVisible({ timeout: 3000 });

        // Pass both page objects to test
        await use({ login, home });
    }
});

module.exports = { test, expect };
