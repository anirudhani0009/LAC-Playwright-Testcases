const {expect} = require("@playwright/test");

class SignupPage{
    constructor(page){
        this.page = page;
        this.signupHeader = "//h2[text()='Sign Up']";
        this.name = "#name";
        this.email = "#email";
        this.password = "#password";
        this.interestsConfig = {
            values: ["JavaScript", "AI", "test", "Selenium"],
            getLocator: (text) => `//label[contains(@class, 'interest') and text()='${text}']`
        };
        this.gender = "//label[@class='gender' and text()='Female']";
        this.state = {
            locator: "#state",
            option: "Jharkhand"
        };
        this.hobbies = {
            locator: "#hobbies",
            options: ["Reading", "Swimming"]
        };
        this.signupButton = "//button[text()='Sign up']";
    }

    async signupFill(name, email, password){
        await this.page.fill(this.name, name);
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        for(const value of this.interestsConfig.values){
            const locator = this.interestsConfig.getLocator(value);
            await this.page.click(locator);
        }
        await this.page.click(this.gender);
        await this.page.locator(this.state.locator).selectOption(this.state.option);
        await this.page.locator(this.hobbies.locator).selectOption([this.hobbies.options[0],this.hobbies.options[1]]);
    }
}

module.exports = SignupPage;