const {test, expect} = require('@playwright/test');

test('Browser Context Playwright Test', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = "alimbansneakers@gmail.com";

    await page.getByPlaceholder('email@example.com').fill(email);

    await page.getByPlaceholder('enter your passsword').fill("Cuppycake@1");
    await page.getByRole("button", {name: 'login'}).click();
   
   //wait based on Netwrok call
   await page.waitForLoadState('networkidle');
   //wait based on async wait function directly on the element itself to be loaded first
    await page.locator(".card-body b").first().waitFor();

    //Selecting 1 product dynamically "Zara Coat 3" from the list of products

    await page.locator('.card-body').filter({hasText:'ZARA COAT 3'})
    .getByRole("button",{name: " Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button", {name:"  Cart "}).click();

    await page.locator("div li").first().waitFor();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", {name:"Checkout"}).click();


    //Auto suggestion drop down

    await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay: 150});

    await page.getByRole("button", {name:"India"}).nth(1).click();


    //Placing the order

    await page.getByText("Place Order ").click();

    //asserting succesful message of order placed

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    //Storing order ID

    const rawOrderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

    const orderID = rawOrderID.replace(/\|/g, '').trim();

    console.log(orderID);

    //Assert that orderID exists in order page

    await page.getByRole("button", {name:"  ORDERS"}).click();

    await page.locator('tr.ng-star-inserted').first().waitFor();

    await page.locator('tr.ng-star-inserted').filter({hasText:orderID}).getByRole("button", {name:"View"}).click();

    const orderDetailsPageID = await page.locator(".col-text").textContent();

    expect(orderID.includes(orderDetailsPageID)).toBeTruthy();

});
