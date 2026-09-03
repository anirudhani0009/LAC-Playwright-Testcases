const { expect } = require("@playwright/test");

// Page object model for the signup page.
// Contains selectors and form interactions for the signup workflow.
class SignupPage {
    constructor(page) {
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
            values: ["C", "Java"],
            getLocator: (text) => `//label[contains(@class, 'interest') and text()='${text}']`
        };
        // Radio button or label selector for selecting gender.
        this.gender = "//input[@name='gender' and @value='Female']";
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
        //Already a user? Login -  Button
        this.login = "//a[@href='/login']";
    }

    //Filling Name
    async signUpFillName(name) {
        await this.page.fill(this.name, name);
    }

    //Filling email
    async signUpFillEmail(email) {
        await this.page.fill(this.email, email);
    }
    //Filling Password
    async signUpFillPassword(password) {
        await this.page.fill(this.password, password);
    }

    //Checking interest checkboxes
    async signUpFillInterests() {
        // Click each interest checkbox or label on the page.
        for (const value of this.interestsConfig.values) {
            const locator = this.interestsConfig.getLocator(value);
            await this.page.click(locator);
        }
    }

    // Select gender values.
    async signUpFillGender() {
        await this.page.click(this.gender);
    }

    // Select state values.
    async signUpFillState() {
        await this.page.locator(this.state.locator).selectOption(this.state.option);
    }

    // Select hobbies values
    async signUpFillHobbies() {
        await this.page.locator(this.hobbies.locator).selectOption([this.hobbies.options[0], this.hobbies.options[1]]);
    }

    //Clicking on Already a user? Login - Link
    async loginLink(){
        await this.page.click(this.login);
    }

}

module.exports = SignupPage;