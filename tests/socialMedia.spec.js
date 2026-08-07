const {test, expect} = require("@playwright/test");
const Login = require("../pages/loginpage.js");

test.describe("Testing Social media buttons in Login Page", () => {
    let login;

    test.beforeEach(async ({ page }) => {
        // Create the page objects before each test.
        login = new Login(page);

        // Navigate to the login page and verify the page is displayed.
        await login.navigateToLogin();
        await expect(page.locator(login.header)).toBeVisible({timeout: 3000});
    });

    //Checking Youtube button
    test("Should open Youtube in a new tab", async () => {
        const youtubeTab = await login.clickSocialButtonAndGetNewTab(login.youtubeBtn);

        //Verify the string in the URL
        await expect(youtubeTab).toHaveURL(/.*youtube\.com\/MukeshOtwani/);

        //cleanup - Closing the new tab
        await youtubeTab.close();
    })

    //Checking Twitter button
    test("Should open Twitter in a new tab", async () => {
        const twitterTab = await login.clickSocialButtonAndGetNewTab(login.twitterBtn);

        //Verify the string in the URL
        await expect(twitterTab).toHaveURL(/.*x\.com\/MukeshOtwani/);

        //cleanup - Closing the new tab
        await twitterTab.close();
    })

    //Checking Linkedin button
    test("Should open LinkedinTab in a new tab", async () => {
        const linkedinTab = await login.clickSocialButtonAndGetNewTab(login.linkedinBtn);

        //Verify the string in the URL
        await expect(linkedinTab).toHaveURL(/.*linkedin\.com.*/);

        //cleanup - Closing the new tab
        await linkedinTab.close();
    })
    
    //Checking Facebook button
    test("Should open Facebook in a new tab", async () => {
        const facebookTab = await login.clickSocialButtonAndGetNewTab(login.facebookBtn);

        //Verify the string in the URL
        await expect(facebookTab).toHaveURL(/.*facebook\.com.*/);

        //cleanup - Closing the new tab
        await facebookTab.close();
    })
});