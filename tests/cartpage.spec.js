const { test, expect } = require("../fixtures/cartFixture.js");
const LoginData = require("../assets/lac-loginCred.json");

// Test suite: Validates cart page functionality including items, pricing, removal, and checkout
// Covers: cart contents verification, price calculations, enrollment flow, item removal, checkout completion
test.describe("LAC cart Page behaviours", () => {

    test("Verify Items and prices in the cart and pressing cancel from the pop-up", async ({ goTocart:{home, cart} }) => {
        // SCENARIO: User views cart items/prices and opens enrollment but cancels without purchasing
        // EXPECTED: All items displayed correctly, total price is accurate, enrollment popup closes
        
        // Verify all expected courses are in cart (same count as added in fixture)
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        
        // Calculate total price and verify cart displays correct total
        const calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        // Open enrollment popup and verify total matches
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        
        // Click cancel button and verify popup closes
        await cart.cancelBtnPopup.click();
        await expect(cart.popUp).not.toBeVisible({ timeout: 3000 });
    });

    test("Verify Items and prices in the cart and completing order", async ({ goTocart:{home, cart} }) => {
        // SCENARIO: User views cart, opens enrollment, fills form, and completes purchase
        // EXPECTED: Order is processed successfully and order ID is generated
        
        // Verify cart contents and total before checkout
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        const calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        // Open enrollment popup and verify total
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        
        // Fill enrollment form with user details and submit
        await cart.fillPopUp();
        await cart.enrollNowBtnPopUp.click();
        
        // Verify successful order: order ID should be generated and visible
        await expect(cart.orderIdLocator).toBeVisible({timeout: 3000});
        // Verify order ID matches expected format (order-XXXXXXXXXX)
        await expect(cart.orderIdLocator).toHaveText(/^order-[a-zA-Z0-9]+$/);
        
        // Log the generated order ID for reference/debugging
        const orderId = await cart.orderIdLocator.innerText();
        console.log(`Generated Order ID: ${orderId}`);
        
        // Close popup - verify cart is now empty (order completed and cleared)
        await cart.cancelBtnPopup.click();
        await expect(cart.priceLocator).toContainText("0");
    });

    test("Removing all items one by one from the cart, checking the price and clicking on Shop now button", async ({ goTocart:{home, cart} }) => {
        // SCENARIO: User removes each course individually and verifies cart updates, then clicks Shop Now
        // EXPECTED: Cart total decreases with each removal, Shop Now returns to homepage
        
        // Verify initial cart state with all items
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        const calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        // Remove each course one by one and verify price updates
        for(const course of cart.coursesAll){
            await cart.removeFromCart(course);
            const calculatedPrice = await cart.getCartTotalPrice();
            // Verify price decreases after each removal
            await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
        }
        
        // Verify cart is completely empty (total is 0)
        await expect(cart.priceLocator).toContainText("0");
        
        // Click Shop Now button to return to homepage
        await cart.shopNowBtn.click();
        
        // Verify successful navigation back to homepage
        await expect(home.cart).toBeVisible({timeout: 3000 });
        await expect(home.manageButton).toBeVisible({ timeout: 3000 });
        await expect(home.breadCrumbsBtn).toBeVisible({ timeout:3000 });
    });

    test("Removing all but one item from the cart and enrolling", async ({ goTocart:{home, cart} }) => {
        // SCENARIO: User removes most items, keeping one course, then completes enrollment
        // EXPECTED: Only final course remains, enrollment succeeds, order ID generated
        
        // Verify initial cart state
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        let calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        // Remove all courses except the last one
        for(let i=0; i<cart.coursesAll.length-1; i++ ){
            await cart.removeFromCart(cart.coursesAll[i]);
            calculatedPrice = await cart.getCartTotalPrice();
            // Verify price updates after each removal
            await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
            // Verify enrollment option remains available during removal
            await expect(cart.enrollNowBtn).toBeVisible({ timeout: 3000 });
        }
        
        // Complete enrollment for the remaining single course
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        
        // Fill and submit enrollment form
        await cart.fillPopUp();
        await cart.enrollNowBtnPopUp.click();
        
        // Verify order completed successfully
        await expect(cart.orderIdLocator).toBeVisible({timeout: 3000});
        await expect(cart.orderIdLocator).toHaveText(/^order-[a-zA-Z0-9]+$/);
        const orderId = await cart.orderIdLocator.innerText();
        console.log(`Generated Order ID: ${orderId}`);
        
        // Close popup and verify cart is empty
        await cart.cancelBtnPopup.click();
        await expect(cart.priceLocator).toContainText("0");
    });

    test("Removing all but one item from the cart and cancelling order from pop-up", async ({ goTocart:{home, cart} }) => {
        // SCENARIO: User removes items to leave one course, opens enrollment, fills form, but cancels
        // EXPECTED: Enrollment popup closes, cart with single item remains unchanged
        
        // Verify initial cart state with all items
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        let calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        // Remove all courses except the last one, verifying price updates
        for(let i=0; i<cart.coursesAll.length-1; i++ ){
            await cart.removeFromCart(cart.coursesAll[i]);
            calculatedPrice = await cart.getCartTotalPrice();
            await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
            // Verify enrollment option remains available
            await expect(cart.enrollNowBtn).toBeVisible({ timeout: 3000 });
        }
        
        // Open enrollment popup and fill form
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        
        // Fill enrollment form
        await cart.fillPopUp();
        
        // Cancel enrollment (do not submit)
        await cart.cancelBtnPopup.click();
        
        // Verify cart still shows the single remaining item with unchanged price
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
    });

});