const {expect} = require("@playwright/test");
const courseData = JSON.parse(JSON.stringify(require("../assets/lac-courses.json")));

// Page object model for the cart page.
// Contains selectors and form interactions for the cart page.
class CartPage {

    constructor(page){
        this.page = page;
        this.shopNowBtn = page.getByRole('button', {name: 'Shop Now', exact: true});
        //enroll button in the cart page
        this.enrollNowBtn = page.locator('.top-container').getByRole('button', {name: 'Enroll Now', exact: true});
        this.courses = courseData;
        this.coursesAll = Object.values(this.courses);
        this.allremoveFromCartBtns = page.locator('.course-card').getByRole('button', {name: 'Remove from Cart'});
        //Price shown in the cart page
        this.priceLocator = page.locator('.top-container h3 b');
        this.individualPrices = page.locator('.course-card #cardChip b');
        this.address = page.locator('#address');
        this.phone = page.locator('#phone');
        //enroll button in the pop up
        this.enrollNowBtnPopUp = page.locator('.action-btn',{hasText: 'Enroll Now'});
        //Price shown in the pop up
        this.priceLocatorPopUp = page.locator('.modal-body h3 b');
        //Cancel button in the pop up
        this.cancelBtnPopup = page.locator('.action-btn', {hasText: 'Cancel'});
        //Pop up
        this.popUp = page.locator('.modal-content');
        this.adressText = "Test House, Test block, Test district, Test state";
        this.phoneNum = "9496769421";
        //Locate the bold element holding the order ID
        this.orderIdLocator = page.locator('.modal-body h4.uniqueId b');

    }

    /*
     Calculates the sum of all courses in the cart and asserts against the total price
     */
    async getCartTotalPrice(){
         //Fetch all matching price elements
         const priceElements = await this.individualPrices.all();
         let sum = 0;

         for(const price of priceElements){

            const rawPrice = await price.innerText();
            const priceValue = parseFloat(rawPrice.replace('₹', '').trim());
            sum += priceValue;
         }

         return sum;
    }

    async fillPopUp(){
        await this.address.fill(this.adressText);
        await this.phone.fill(this.phoneNum);
    }


    async removeFromCart(courseName) {

        const button = await this.page.locator('.course-card', {
            // Targets only the h2 with class 'name' for the exact text match
            has: this.page.locator('h2.name',
                {
                    hasText: new RegExp(`^${courseName}$`)
                })
        })
            .getByRole('button', { hasText: 'Remove from Cart' });
        //const button = this.getRemoveButton(courseName);
        await button.click();
    }

}
module.exports = CartPage;