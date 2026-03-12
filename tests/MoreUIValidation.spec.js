const{test, expect} = require("@playwright/test");

test("More UI Validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //Hidden field verification

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.getByRole("button", {name: "Hide"}).click();

    await expect(page.locator("#displayed-text")).toBeHidden();

    //handle Java Alert Pop-Ups

    page.on('dialog', dialog => dialog.accept()); 

    await page.getByRole("button", {name: "Confirm"}).click();

    //how to hover over elements

    await page.locator("#mousehover").hover();

    //handling child iFrames

    //the whole section of the child frame will be within a tag called <iFrame> or <frameset>

    const framePage = page.frameLocator("[name='iframe-name']");

    await framePage.locator("li a[href*='lifetime-access']:visible").click();

    const textcheck = await framePage.locator(".text h2").textContent();

    console.log(textcheck.split(" ")[1]);

    console.log("More Git push / pull checks");

})

test("Git Demo", async({page})=>{


    console.log("Trying out Git / GitHub");
})

