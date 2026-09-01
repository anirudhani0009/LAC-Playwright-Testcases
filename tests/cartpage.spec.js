const { test, expect } = require("../fixtures/cartFixture.js");
const LoginData = JSON.parse(JSON.stringify(require("../assets/lac-loginCred.json")));

// These tests verify cart contents, totals, removal behavior, and enrollment flows.
test.describe("LAC cart Page behaviours", () => {

    test("Verify Items and prices in the cart and pressing cancel from the pop-up", async ({ goTocart:{home, cart} }) => {

        // Confirm that all expected courses were added and that the displayed total is correct.
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        const calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        // Open enrollment, verify its total, then cancel without completing the order.
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        await cart.cancelBtnPopup.click();
        await expect(cart.popUp).not.toBeVisible({ timeout: 3000 });

    });

    test("Verify Items and prices in the cart and completing order", async ({ goTocart:{home, cart} }) => {

        // Confirm the cart contents and total before starting enrollment.
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        const calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        // Submit the enrollment form and verify that a valid order ID is generated.
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        await cart.fillPopUp();
        await cart.enrollNowBtnPopUp.click();
        await expect(cart.orderIdLocator).toBeVisible({timeout: 3000});
        await expect(cart.orderIdLocator).toHaveText(/^order-[a-zA-Z0-9]+$/);
        const orderId = await cart.orderIdLocator.innerText();
        console.log(`Generated Order ID: ${orderId}`);
        await cart.cancelBtnPopup.click();
        await expect(cart.priceLocator).toContainText("0");
    });

    test("Removing all items one by one from the cart, checking the price and clicking on Shop now button", async ({ goTocart:{home, cart} }) => {

        // Confirm the starting cart contents and total.
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        const calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        // Remove every course and verify that the total decreases after each removal.
        for(const course of cart.coursesAll){

            await cart.removeFromCart(course);
            const calculatedPrice = await cart.getCartTotalPrice();
            await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        }
        await expect(cart.priceLocator).toContainText("0");
        await cart.shopNowBtn.click();
        // Confirm that Shop Now returns the user to the homepage.
        await expect(home.cart).toBeVisible({timeout: 3000 });
        await expect(home.manageButton).toBeVisible({ timeout: 3000 });
        await expect(home.breadCrumbsBtn).toBeVisible({ timeout:3000 });
    });


    test("Removing all but one item from the cart and enrolling", async ({ goTocart:{home, cart} }) => {

        // Keep one course in the cart and verify its total after each removal.
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        let calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        // Remove all but the final course, preserving the enrollment option throughout.
        for(let i=0; i<cart.coursesAll.length-1; i++ ){

            await cart.removeFromCart(cart.coursesAll[i]);
            calculatedPrice = await cart.getCartTotalPrice();
            await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
            await expect(cart.enrollNowBtn).toBeVisible({ timeout: 3000 });

        }
        // Complete enrollment for the remaining course and verify the order ID.
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        await cart.fillPopUp();
        await cart.enrollNowBtnPopUp.click();
        await expect(cart.orderIdLocator).toBeVisible({timeout: 3000});
        await expect(cart.orderIdLocator).toHaveText(/^order-[a-zA-Z0-9]+$/);
        const orderId = await cart.orderIdLocator.innerText();
        console.log(`Generated Order ID: ${orderId}`);
        await cart.cancelBtnPopup.click();
        await expect(cart.priceLocator).toContainText("0");
    });

    test("Removing all but one item from the cart and cancelling order from pop-up", async ({ goTocart:{home, cart} }) => {

        // Keep one course in the cart and verify its total after each removal.
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        let calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        // Remove all but the final course before opening the enrollment pop-up.
        for(let i=0; i<cart.coursesAll.length-1; i++ ){

            await cart.removeFromCart(cart.coursesAll[i]);
            calculatedPrice = await cart.getCartTotalPrice();
            await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
            await expect(cart.enrollNowBtn).toBeVisible({ timeout: 3000 });

        }
        // Open enrollment, fill the form, and cancel to confirm the cart remains unchanged.
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        await cart.fillPopUp();
        await cart.cancelBtnPopup.click();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
    });

});