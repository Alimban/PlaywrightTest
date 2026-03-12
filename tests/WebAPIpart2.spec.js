//Second way of Integrating UI and API
//Consider there are multiple tests (create order, orderdetails, order history etc)
//In this case, login will happen once using UI -> Collect all the settings into a JSON file
// Inject that JSON file into the test

const {test, expect} = require('@playwright/test');

let webContext;
const email = "alimbansneakers@gmail.com";

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator('input#userEmail').fill(email);
    await page.locator('input#userPassword').fill("Cuppycake@1");
    await page.locator('input#login').click();
    await page.waitForLoadState('networkidle');

    await context.storageState({path: 'state.json'});

    webContext = await browser.newContext({storageState: 'state.json'});
}
)


test('Browser Context Playwright Test', async ()=>
{

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //wait based on async wait function directly on the element itself to be loaded first
    await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //Selecting 1 product dynamically "Zara Coat 3" from the list of products

    const productName = "ZARA COAT 3";

    const products = page.locator('.card-body');

    const count = await products.count();

    for(let i=0; i < count; ++i)
    {
        if (await products.nth(i).locator("b").textContent() == productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();

            break;

        }

    }
    await page.locator("[routerlink*='cart']").click();

    await page.locator("div li").first().waitFor();

    const boolean = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();

    expect(boolean).toBeTruthy();

    await page.locator("text=Checkout").click();

    //Auto suggestion drop down

    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 150});

    const countrydropdown = page.locator(".ta-results");

    await countrydropdown.waitFor();

    const optionCount = await countrydropdown.locator("button").count();

    for(let i=0; i<optionCount; ++i)
    {
       if(await countrydropdown.locator("button").nth(i).textContent() === " India")
       {
            await countrydropdown.locator("button").nth(i).click();
            break;

       }
    }

    const selectedEmail = page.locator("label[type*='text']");

    expect(selectedEmail).toHaveText(email);

    //Placing the order

    await page.locator(".action__submit").click();

    //asserting succesful message of order placed

    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");

    //Storing order ID

    const orderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

    console.log(orderID);

    //Assert that orderID exists in order page

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.locator('tr.ng-star-inserted').first().waitFor();

    const rows = await page.locator('tr.ng-star-inserted');

    const orderCount = await rows.count();
    

    for(let i=0; i<orderCount; ++i)
    {
        
        const rowOrderID = await rows.nth(i).locator('th').textContent();

        if(orderID.includes(rowOrderID))
        {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }

    const orderDetailsPageID = await page.locator(".col-text").textContent();

    expect(orderID.includes(orderDetailsPageID)).toBeTruthy();



    



});
