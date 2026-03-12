const { test, expect } = require("@playwright/test");

test("ScreenShot Test", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("#displayed-text").screenshot({path: 'partialscreenshot.png'});

    await page.getByRole("button", {name: "Hide"}).click();

    await page.screenshot({path: "screenshot.png"});

    await expect(page.locator("#displayed-text")).toBeHidden();

})

test.only("Visual Comparison test", async({page})=>{

    await page.goto("https://www.flightaware.com/");

    expect(await page.screenshot()).toMatchSnapshot('Landaware.png');
})