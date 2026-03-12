const {test,expect,request} = require("@playwright/test");


test("Security Test Mock Request", async({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = "alimbansneakers@gmail.com";

    await page.locator('input#userEmail').fill(email);
    await page.locator('input#userPassword').fill("Cuppycake@1");
    await page.locator('input#login').click();
    await page.waitForLoadState('networkidle');
   await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=> route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6662662266662'
        })
    )

    await page.locator("button:has-text('View')").first().click()

    await expect(page.getByText('You are not authorize to view')).toBeVisible();

    


})