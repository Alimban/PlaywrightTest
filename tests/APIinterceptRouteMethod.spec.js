const { test, expect, request } = require("@playwright/test");
const { APIutils } = require("../Utils/APIutils");


const loginPayload = { userEmail: "alimbansneakers@gmail.com", userPassword: "Cuppycake@1" };
const createOrderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakeOrderListPayload = { data: [], message: "No Orders" };
let response;



test.beforeAll(async () => {


    const apiContext = await request.newContext();
    //const apiUtils = new APIutils(apiContext, loginPayload);

    //response = await apiUtils.createOrder(createOrderPayload);


}
)



test('Place the order', async ({ page }) => {
    await page.addInitScript(value => { window.localStorage.setItem('token', value) }, response.token);


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    //Test Scenario - Account has many orders and many testers use this account. BUt we need to
    //test no order message. Hence we need to mock the response before clicking MY Order.

    //Code for routing network call

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //intercepting the response
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakeOrderListPayload);
            route.fulfill({
                response,
                body,
            })
        }
    )

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    console.log(await page.locator(".mt-4").textContent());


});