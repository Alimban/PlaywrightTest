const {test, expect} = require('@playwright/test');
const {LoginPage} = require("../pageObjects/loginPage");
const{ProductPage} = require("../pageObjects/productPage");
const dataSet = JSON.parse(JSON.stringify(require("../Utils/clientAppData.json")));

test('Browser Context Playwright Test', async ({page})=>
{
    
    //LoginPage Operations
    const loginPage = new LoginPage(page);
    await loginPage.gotoURL();
    await loginPage.validLogin(dataSet.email,dataSet.password);

    //ProductPage Operations
    const productPage = new ProductPage(page);
    await productPage.searchAndAddProduct(dataSet.productName);
    await productPage.navigateToCart();

    //CartPage Operations


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

    expect(selectedEmail).toHaveText(dataSet.email);

    



});
