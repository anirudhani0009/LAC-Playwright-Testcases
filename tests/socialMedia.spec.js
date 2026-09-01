const {test, expect} = require("../fixtures/loginFixture.js");

// Test suite: Validates that social media buttons on login page open correct external links
// Covers: YouTube, Twitter/X, LinkedIn, and Facebook link verification
test.describe("Testing Social media buttons in Login Page", () => {
    
    test("Should open Youtube in a new tab", async ({goToLogin:{login}}) => {
        // SCENARIO: User clicks YouTube social media button on login page
        // EXPECTED: New tab opens and navigates to correct YouTube channel
        
        // Click YouTube button and capture the new browser tab/window
        const youtubeTab = await login.clickSocialButtonAndGetNewTab(login.youtubeBtn);

        // Verify the correct YouTube channel URL is opened (should contain youtube.com/MukeshOtwani)
        await expect(youtubeTab).toHaveURL(/.*youtube\.com\/MukeshOtwani/);

        // Cleanup - Close the new tab to keep browser clean
        await youtubeTab.close();
    })

    test("Should open Twitter in a new tab", async ({goToLogin:{login}}) => {
        // SCENARIO: User clicks Twitter/X social media button on login page
        // EXPECTED: New tab opens and navigates to correct Twitter/X profile
        
        // Click Twitter button and capture the new browser tab
        const twitterTab = await login.clickSocialButtonAndGetNewTab(login.twitterBtn);

        // Verify the correct Twitter/X profile URL is opened (should contain x.com/MukeshOtwani)
        await expect(twitterTab).toHaveURL(/.*x\.com\/MukeshOtwani/);

        // Cleanup - Close the new tab
        await twitterTab.close();
    })

    test("Should open LinkedinTab in a new tab", async ({goToLogin:{login}}) => {
        // SCENARIO: User clicks LinkedIn social media button on login page
        // EXPECTED: New tab opens and navigates to LinkedIn profile/page
        
        // Click LinkedIn button and capture the new browser tab
        const linkedinTab = await login.clickSocialButtonAndGetNewTab(login.linkedinBtn);

        // Verify the correct LinkedIn URL is opened (should contain linkedin.com)
        await expect(linkedinTab).toHaveURL(/.*linkedin\.com.*/);

        // Cleanup - Close the new tab
        await linkedinTab.close();
    })
    
    test("Should open Facebook in a new tab", async ({goToLogin:{login}}) => {
        // SCENARIO: User clicks Facebook social media button on login page
        // EXPECTED: New tab opens and navigates to Facebook page
        
        // Click Facebook button and capture the new browser tab
        const facebookTab = await login.clickSocialButtonAndGetNewTab(login.facebookBtn);

        // Verify the correct Facebook URL is opened (should contain facebook.com)
        await expect(facebookTab).toHaveURL(/.*facebook\.com.*/);

        // Cleanup - Close the new tab
        await facebookTab.close();
    })
});
