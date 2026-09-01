const { test: loginTest, expect } = require("./auth.js");
const Cart = require("../pages/cartpage.js");

const test = loginTest.extend({
    goTocart: async ({ page, auth: { home } }, use) => {
        const cart = new Cart(page);
        // Add every course from the test data so each test starts with the same cart contents.
        await home.addCourses(home.coursesAll);
        await expect(home.cartCountLocator).toContainText(Object.keys(home.courses).length.toString());

        // Open the cart and confirm that enrollment is available.
        await home.goTocart();
        await expect(cart.enrollNowBtn).toBeVisible({ timeout: 3000 });

        await use({home, cart});
    }
});
module.exports = {test, expect};