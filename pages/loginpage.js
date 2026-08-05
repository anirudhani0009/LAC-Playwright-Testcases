const {expect} = require("@playwright/test");

class LoginPage{

    constructor(page){
        this.page = page;
        this.email = "#email1";
        this.password = "#password1"
        this.signinButton = "//button[text()='Sign in']";
        this.url = "https://freelance-learn-automation.vercel.app/login";

    }

    async navigate(){
        await this.page.goto(this.url);
    }

    async signinToApplication(email,password){

        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        await this.page.click(this.signinButton);
        await this.page.waitForLoadState("networkidle");

    }
}

module.exports = LoginPage;