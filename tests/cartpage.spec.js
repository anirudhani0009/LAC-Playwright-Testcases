const { test, expect } = require("@playwright/test");
const Login = require("../pages/loginpage.js");
const Home = require("../pages/homepage.js");
const Cart = require("../pages/cartpage.js");
const LoginData = JSON.parse(JSON.stringify(require("../assets/lac-loginCred.json")));

// These tests verify cart contents, totals, removal behavior, and enrollment flows.
test.describe("LAC cart Page behaviours", () => {
    let login;
    let home;
    let cart;

    test.beforeEach(async ({ page }) => {
        // Create page objects so each test can use the page-specific actions and locators.
        login = new Login(page);
        home = new Home(page);
        cart = new Cart(page);

        // Sign in and confirm that the authenticated homepage is available.
        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({ timeout: 3000 });
        await login.signinToApplication(LoginData.username, LoginData.password);
        await expect(page.locator(login.signinButton)).not.toBeVisible();
        await expect(home.cart).toBeVisible({timeout: 3000 });

        // Add every course from the test data so each test starts with the same cart contents.
        await home.addCourses(home.coursesAll);
        await expect(home.cartCountLocator).toContainText(Object.keys(home.courses).length.toString());

        // Open the cart and confirm that enrollment is available.
        await home.goTocart();
        await expect(cart.enrollNowBtn).toBeVisible({timeout: 3000});

    });

    test("Verify Items and prices in the cart and pressing cancel from the pop-up", async ({ page }) => {

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

    test("Verify Items and prices in the cart and completing order", async ({ page }) => {

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

    test("Removing all items one by one from the cart, checking the price and clicking on Shop now button", async ({ page }) => {

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


    test("Removing all but one item from the cart and enrolling", async ({ page }) => {

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

    test("Removing all but one item from the cart and cancelling order from pop-up", async ({ page }) => {

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