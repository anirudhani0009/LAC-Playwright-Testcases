const {expect} = require("@playwright/test");

// Page object model for the login page.
// This class keeps all login-related selectors and actions in one place.
class LoginPage{

    constructor(page){
        // Reference to the Playwright page instance used by the tests.
        this.page = page;
        // Header text used to verify that the login page has loaded.
        this.header = "//h2[text()='Sign In']";
        // Login page URL for direct navigation.
        this.url = "https://freelance-learn-automation.vercel.app/login";
        // Input locators for email and password fields.
        this.email = "#email1";
        this.password = "#password1"
        // Buttons and links on the login page.
        this.signinButton = "//button[text()='Sign in']";
        this.signupButton = "//a[text()='New user? Signup']";
        // Error messages mapped to keys for easy lookup in tests.
        this.errorMsg = {
            messages:{
                general: "Email and Password Doesn't match",
                wrongemail:"USER Email Doesn't Exist",
                wrongEmail: "USER Email Doesn't Exist",
                allEmpty: "Email and Password is required",
                emptyEmail: "Email is required",
                emptyPassword: "Password is required"
            },           
            // Builds an XPath locator for the selected error message. used in fun getErrorLocator(errorkey)
            error: (msg) => {
                return `//h2[text()="${this.errorMsg.messages[msg]}"]`
            } 
        };
        //Social Media buttons right below Sign in button
        this.youtubeBtn = page.locator('a[href*="youtube.com"]').first();
        this.twitterBtn = page.locator('a[href*="twitter.com"]').first();
        this.linkedinBtn = page.locator('a[href*="linkedin.com"]').first();
        this.facebookBtn = page.locator('a[href*="facebook.com"]').first();
    }

    // Returns a Playwright locator for an error based on a key from the messages map.
    getErrorLocator(errorkey){
        const xpath = this.errorMsg.error(errorkey);
        return this.page.locator(xpath);
    }

    // Navigates the browser to the login page URL.
    async navigateToLogin(){
        await this.page.goto(this.url);
    }

    // Fills the login form and submits it.
    async signinToApplication(email,password){
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        await this.page.click(this.signinButton);
    }

    // Clicks the signup link to go to the signup page.
    async navigateToSignUp(){
        await this.page.click(this.signupButton);
    }

    //Clicks a social button and returns the newly opened page object
    async clickSocialButtonAndGetNewTab(socialLocator){
        // 1. Set up the listener for the new tab event
        const newTabPromise = this.page.context().waitForEvent('page');

        // 2. Click the button that triggers the new tab
        await socialLocator.click();

         // 3. Wait for the tab to completely load and return it
        const newTab = await newTabPromise;
        await newTab.waitForLoadState();
        return newTab;
    }

};

module.exports = LoginPage;