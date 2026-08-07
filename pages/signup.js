const {expect} = require("@playwright/test");

// Page object model for the signup page.
// Contains selectors and form interactions for the signup workflow.
class SignupPage{
    constructor(page){
        // Store the current Playwright page reference.
        this.page = page;
        // Header locator used to confirm the signup page is visible.
        this.signupHeader = "//h2[text()='Sign Up']";
        // Input fields for name, email, and password.
        this.name = "#name";
        this.email = "#email";
        this.password = "#password";
        // Configurable list of interests and a helper to build their locators.
        this.interestsConfig = {
            values: ["JavaScript", "AI", "test", "Selenium"],
            getLocator: (text) => `//label[contains(@class, 'interest') and text()='${text}']`
        };
        // Radio button or label selector for selecting gender.
        this.gender = "//label[@class='gender' and text()='Female']";
        // Dropdown selector and the option that should be selected.
        this.state = {
            locator: "#state",
            option: "Jharkhand"
        };
        // Multi-select or checkbox control for hobbies.
        this.hobbies = {
            locator: "#hobbies",
            options: ["Reading", "Swimming"]
        };
        // Button used to submit the signup form.
        this.signupButton = "//button[text()='Sign up']";
    }

    // Fills the signup form fields, selects interests, gender, state, and hobbies.
    async signupFill(name, email, password){
        await this.page.fill(this.name, name);
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        // Click each interest checkbox or label on the page.
        for(const value of this.interestsConfig.values){
            const locator = this.interestsConfig.getLocator(value);
            await this.page.click(locator);
        }
        // Select gender and state values.
        await this.page.click(this.gender);
        await this.page.locator(this.state.locator).selectOption(this.state.option);
        // Select multiple hobbies from the hobbies control.
        await this.page.locator(this.hobbies.locator).selectOption([this.hobbies.options[0],this.hobbies.options[1]]);
    }
}

module.exports = SignupPage;