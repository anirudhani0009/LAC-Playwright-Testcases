const {expect} = require("@playwright/test");

class HomePage{

    constructor(page){
        this.page = page;
        this.manageButton = "//span[text()='Manage']";
    }
}
module.exports = HomePage;