const {test, expect} = require('@playwright/test');

test.describe.configure({mode:'parallel'})
test('@Smoke Browser Context Playwright Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await page.locator('input#username').fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator('input#signInBtn').click();

    //asserting vanishing error message 
    console.log(await page.locator("[style*= 'block']").textContent());
    await expect(page.locator("[style*= 'block']")).toContainText("Incorrect");

    //Successful login

    const userName = page.locator('input#username');
    const passWord = page.locator("[type='password']");
    const signInBtn = page.locator('input#signInBtn');


    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await passWord.fill("");
    await passWord.fill("Learning@830$3mK2");
    await signInBtn.click();

    console.log(await page.locator(".card-body a").nth(0).textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());

    const cardTitles = page.locator(".card-body a");

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});

test('@Web Page Playwright Test', async ({page})=>
{
    await page.goto("https://google.com");
    //get Title 
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});


test('@Smoke UI controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    
    const userName = page.locator('input#username');
    const passWord = page.locator("[type='password']");
    const signInBtn = page.locator('input#signInBtn');

    await userName.fill("rahulshettyacademy");
    await passWord.fill("Learning@830$3mK2");

    //Static dropdown
    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("consult");

    //radio button

    await page.locator('.radiotextsty').nth(1).click(); 
    await page.locator('#okayBtn').click();

    //Assert that radio button is checked

    await expect(page.locator('.radiotextsty').nth(1)).toBeChecked();

    console.log(await page.locator('.radiotextsty').nth(1).isChecked());

    //Checkbox and asserting

    await page.locator('#terms').click();

    await expect(page.locator('#terms')).toBeChecked();

    //Unchek and asserting

    await page.locator('#terms').uncheck();

    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    //Blinking text & assertion

    const docLink = page.locator("[href*= 'documents-request']");

    await expect(docLink).toHaveAttribute("class","blinkingText");
    
    //await page.pause();

    //await signInBtn.click();
});



test.only('@Web Handling Child Window', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    page.route('**/*.css',route=>route.abort());  //Abort function for API metwork calls

    const userName = page.locator('input#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 

    const docLink = page.locator("[href*= 'documents-request']");

    const [newPage] = await Promise.all(
    [
    context.waitForEvent('page'),   //Listen for any new page
    docLink.click(),
    ])

    console.log(await newPage.locator('p.red').textContent());

    const text = await newPage.locator('p.red').textContent();

    const arrayText = text.split("@");

    const domain = arrayText[1].split(" ")[0];

    await userName.fill(domain)

   console.log(await userName.inputValue());


})