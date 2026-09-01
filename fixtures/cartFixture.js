// Cart fixture - pre-populates cart with all courses
// Used for tests that need to start with items already in the shopping cart

const { test: loginTest, expect } = require("./auth.js");
const Cart = require("../pages/cartpage.js");

const test = loginTest.extend({
    // Extends auth fixture: login + authenticated session + add courses to cart
    goTocart: async ({ page, auth: { home } }, use) => {
        const cart = new Cart(page);
        
        // Add all courses to cart and verify cart count matches
        await home.addCourses(home.coursesAll);
        await expect(home.cartCountLocator).toContainText(Object.keys(home.courses).length.toString());

        // Open the cart and confirm that enrollment is available.
        await home.goTocart();
        await expect(cart.enrollNowBtn).toBeVisible({ timeout: 3000 });

        // Pass both home and cart objects to test
        await use({home, cart});
    }
});
module.exports = {test, expect};