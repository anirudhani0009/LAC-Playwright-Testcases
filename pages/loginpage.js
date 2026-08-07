const {expect} = require("@playwright/test");

class LoginPage{

    constructor(page){
        this.page = page;
        this.header = "//h2[text()='Sign In']";
        this.url = "https://freelance-learn-automation.vercel.app/login";
        this.email = "#email1";
        this.password = "#password1"
        this.signinButton = "//button[text()='Sign in']";
        this.signupButton = "//a[text()='New user? Signup']";
        this.errorMsg = {
            messages:{
                general: "Email and Password Doesn't match",
                wrongemail:"USER Email Doesn't Exist",
                wrongEmail: "USER Email Doesn't Exist",
                allEmpty: "Email and Password is required",
                emptyEmail: "Email is required",
                emptyPassword: "Password is required"
            },           
            error: (msg) => {
                return `//h2[text()="${this.errorMsg.messages[msg]}"]`
            } 
        };
        this.genErrorMsg = `//h2[text()="USER Email Doesn't Exist"]`;
        this.wrongPassErr = `//h2[text()="Email and Password Doesn't match"]`;

    }

    getErrorLocator(errorkey){
        const xpath = this.errorMsg.error(errorkey);
        return this.page.locator(xpath);
    }

    async navigateToLogin(){
        await this.page.goto(this.url);
    }

    async signinToApplication(email,password){

        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        await this.page.click(this.signinButton);
    }

    async navigateToSignUp(){
        await this.page.click(this.signupButton);
    }
}

module.exports = LoginPage;