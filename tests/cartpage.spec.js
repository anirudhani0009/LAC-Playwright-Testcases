const { test, expect } = require("@playwright/test");
const Login = require("../pages/loginpage.js");
const Home = require("../pages/homepage.js");
const Cart = require("../pages/cartpage.js");
const LoginData = JSON.parse(JSON.stringify(require("../assets/lac-loginCred.json")));

// Test suite for the cart page and its validation behavior.
test.describe("LAC cart Page behaviours", () => {
    let login;
    let home;
    let cart;

    test.beforeEach(async ({ page }) => {
        // Create the page objects before each test.
        login = new Login(page);
        home = new Home(page);
        cart = new Cart(page);

        // Navigate to the cart page and verify the page is displayed.
        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({ timeout: 3000 });
        await login.signinToApplication(LoginData.username, LoginData.password);
        await expect(page.locator(login.signinButton)).not.toBeVisible();
        await expect(home.cart).toBeVisible({timeout: 3000 });
        await home.addCourses(home.coursesAll);
        //Adding all courses mentioned in lac-courses JSON file
        await expect(home.cartCountLocator).toContainText(Object.keys(home.courses).length.toString());
        await home.goTocart();
        await expect(cart.enrollNowBtn).toBeVisible({timeout: 3000});

    });

    test("Verify Items and prices in the cart and pressing cancel from the pop-up", async ({ page }) => {

        //Checking if the cart contains all the courses added
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        //Checking the total price shown in the cart page with the calculated price
        const calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
        //Clicking the enroll button
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        await cart.cancelBtnPopup.click();
        await expect(cart.popUp).not.toBeVisible({ timeout: 3000 });

    });

    test("Verify Items and prices in the cart and completing order", async ({ page }) => {

        //Checking if the cart contains all the courses added
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        //Checking the total price shown in the cart page with the calculated price
        const calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
        //Clicking the enroll button
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        //Check the Final price shown in the Pop-up
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        //Clicking Enroll button in the pop-up
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

        //Checking if the cart contains all the courses added
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        //Checking the total price shown in the cart page with the calculated price
        const calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        //Removing items one by one and checking the updated price each time
        for(const course of cart.coursesAll){

            await cart.removeFromCart(course);
            const calculatedPrice = await cart.getCartTotalPrice();
            await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        }
        await expect(cart.priceLocator).toContainText("0");
        await cart.shopNowBtn.click();
        //Checking if the page is redirected to home page
        await expect(home.cart).toBeVisible({timeout: 3000 });
        await expect(home.manageButton).toBeVisible({ timeout: 3000 });
        await expect(home.breadCrumbsBtn).toBeVisible({ timeout:3000 });
    });


    test("Removing all but one item from the cart and enrolling", async ({ page }) => {

        //Checking if the cart contains all the courses added
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        //Checking the total price shown in the cart page with the calculated price
        let calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        //Removing items one by one and checking the updated price each time
        for(let i=0; i<cart.coursesAll.length-1; i++ ){

            await cart.removeFromCart(cart.coursesAll[i]);
            calculatedPrice = await cart.getCartTotalPrice();
            await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
            await expect(cart.enrollNowBtn).toBeVisible({ timeout: 3000 });

        }
        //Clicking the enroll button
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        //Check the Final price shown in the Pop-up
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        await cart.fillPopUp();
        //Clicking Enroll button in the pop-up
        await cart.enrollNowBtnPopUp.click();
        await expect(cart.orderIdLocator).toBeVisible({timeout: 3000});
        await expect(cart.orderIdLocator).toHaveText(/^order-[a-zA-Z0-9]+$/);
        const orderId = await cart.orderIdLocator.innerText();
        console.log(`Generated Order ID: ${orderId}`);
        await cart.cancelBtnPopup.click();
        await expect(cart.priceLocator).toContainText("0");
    });

    test("Removing all but one item from the cart and cancelling order from pop-up", async ({ page }) => {

        //Checking if the cart contains all the courses added
        await expect(cart.allremoveFromCartBtns).toHaveCount(Object.keys(home.courses).length);
        //Checking the total price shown in the cart page with the calculated price
        let calculatedPrice = await cart.getCartTotalPrice();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());

        //Removing items one by one and checking the updated price each time
        for(let i=0; i<cart.coursesAll.length-1; i++ ){

            await cart.removeFromCart(cart.coursesAll[i]);
            calculatedPrice = await cart.getCartTotalPrice();
            await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
            await expect(cart.enrollNowBtn).toBeVisible({ timeout: 3000 });

        }
        //Clicking the enroll button
        await cart.enrollNowBtn.click();
        await expect(cart.enrollNowBtnPopUp).toBeVisible({ timeout: 3000 });
        //Check the Final price shown in the Pop-up
        await expect(cart.priceLocatorPopUp).toContainText(calculatedPrice.toString());
        await cart.fillPopUp();
        //Clicking cancell button in the pop-up
        await cart.cancelBtnPopup.click();
        await expect(cart.priceLocator).toContainText(calculatedPrice.toString());
    });

});