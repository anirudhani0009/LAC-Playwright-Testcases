const {test, expect} = require("../fixtures/loginFixture.js");

test.describe("Testing Social media buttons in Login Page", () => {
    //Checking Youtube button
    test("Should open Youtube in a new tab", async ({goToLogin:{login}}) => {
        const youtubeTab = await login.clickSocialButtonAndGetNewTab(login.youtubeBtn);

        //Verify the string in the URL
        await expect(youtubeTab).toHaveURL(/.*youtube\.com\/MukeshOtwani/);

        //cleanup - Closing the new tab
        await youtubeTab.close();
    })

    //Checking Twitter button
    test("Should open Twitter in a new tab", async ({goToLogin:{login}}) => {
        const twitterTab = await login.clickSocialButtonAndGetNewTab(login.twitterBtn);

        //Verify the string in the URL
        await expect(twitterTab).toHaveURL(/.*x\.com\/MukeshOtwani/);

        //cleanup - Closing the new tab
        await twitterTab.close();
    })

    //Checking Linkedin button
    test("Should open LinkedinTab in a new tab", async ({goToLogin:{login}}) => {
        const linkedinTab = await login.clickSocialButtonAndGetNewTab(login.linkedinBtn);

        //Verify the string in the URL
        await expect(linkedinTab).toHaveURL(/.*linkedin\.com.*/);

        //cleanup - Closing the new tab
        await linkedinTab.close();
    })
    
    //Checking Facebook button
    test("Should open Facebook in a new tab", async ({goToLogin:{login}}) => {
        const facebookTab = await login.clickSocialButtonAndGetNewTab(login.facebookBtn);

        //Verify the string in the URL
        await expect(facebookTab).toHaveURL(/.*facebook\.com.*/);

        //cleanup - Closing the new tab
        await facebookTab.close();
    })
});