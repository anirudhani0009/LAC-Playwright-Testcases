const {expect} = require("@playwright/test");

// Page object model for the home page after login.
// Encapsulates selectors and page-specific helpers for assertions.
class HomePage{

    constructor(page){
        // Store the Playwright page instance for later use.
        this.page = page;
        // Locator for the Manage button shown on the logged-in homepage.
        this.manageButton = "//span[text()='Manage']";
    }
}
module.exports = HomePage;