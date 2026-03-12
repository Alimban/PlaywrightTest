const{test, expect, request} = require("@playwright/test");
const{APIutils} = require("../Utils/APIutils");


const loginPayload = {userEmail:"alimbansneakers@gmail.com",userPassword:"Cuppycake@1"};
const createOrderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};
let response; 



test.beforeAll( async()=>
    
    {
        

        const apiContext = await request.newContext();
        const apiUtils = new APIutils(apiContext,loginPayload);

        response = await apiUtils.createOrder(createOrderPayload);

        
    }
)



test('Place the order', async ({page})=>
{
   await page.addInitScript(value=> {window.localStorage.setItem('token',value)},response.token);


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //Assert that orderID exists in order page

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.locator('tr.ng-star-inserted').first().waitFor();

    const rows = await page.locator('tr.ng-star-inserted');

    const orderCount = await rows.count();
    

    for(let i=0; i<orderCount; ++i)
    {
        
        const rowOrderID = await rows.nth(i).locator('th').textContent();

        if(response.orderAPIid.includes(rowOrderID))
        {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }

    const orderDetailsPageID = await page.locator(".col-text").textContent();


    expect(response.orderAPIid.includes(orderDetailsPageID)).toBeTruthy();


});