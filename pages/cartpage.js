const {expect} = require("@playwright/test");
const courseData = require("../assets/lac-courses.json");

// Page object model for the cart page.
// Keeps cart locators and reusable cart actions in one place.
class CartPage {

    constructor(page){
        // Save the Playwright page so helper methods can interact with the browser.
        this.page = page;

        // Buttons and controls available on the cart page.
        this.shopNowBtn = page.getByRole('button', {name: 'Shop Now', exact: true});
        this.enrollNowBtn = page.locator('.top-container').getByRole('button', {name: 'Enroll Now', exact: true});

        // Course data is used by tests when selecting courses to remove.
        this.courses = courseData;
        this.coursesAll = Object.values(this.courses);
        this.allremoveFromCartBtns = page.locator('.course-card').getByRole('button', {name: 'Remove from Cart'});

        // Price locators are used to compare the displayed totals with calculated values.
        this.priceLocator = page.locator('.top-container h3 b');
        this.individualPrices = page.locator('.course-card #cardChip b');

        // Customer fields displayed in the enrollment pop-up.
        this.address = page.locator('#address');
        this.phone = page.locator('#phone');
        this.enrollNowBtnPopUp = page.locator('.action-btn',{hasText: 'Enroll Now'});
        this.priceLocatorPopUp = page.locator('.modal-body h3 b');
        this.cancelBtnPopup = page.locator('.action-btn', {hasText: 'Cancel'});
        this.popUp = page.locator('.modal-content');

        // Test values used to complete the enrollment form.
        this.adressText = "Test House, Test block, Test district, Test state";
        this.phoneNum = "9496769421";

        // The order number is shown in bold after a successful enrollment.
        this.orderIdLocator = page.locator('.modal-body h4.uniqueId b');

    }

     // Add each course price so tests can verify the cart total.
    async getCartTotalPrice(){
            // Read all matching price elements before calculating the total.
         const priceElements = await this.individualPrices.all();
         let sum = 0;

         for(const price of priceElements){
                // Remove the currency symbol before converting the displayed text to a number.
            const rawPrice = await price.innerText();
            const priceValue = parseFloat(rawPrice.replace('₹', '').trim());
            sum += priceValue;
         }

         return sum;
    }

    async fillPopUp(){
        // Fill the required customer details before confirming enrollment.
        await this.address.fill(this.adressText);
        await this.phone.fill(this.phoneNum);
    }


    async removeFromCart(courseName) {

        // Find the course card by its exact heading, then click only that card's button.
        const button = await this.page.locator('.course-card', {
            has: this.page.locator('h2.name',
                {
                    hasText: new RegExp(`^${courseName}$`)
                })
        })
            .getByRole('button', { hasText: 'Remove from Cart' });
        await button.click();
    }

}
module.exports = CartPage;