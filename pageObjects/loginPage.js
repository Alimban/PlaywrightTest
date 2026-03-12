class LoginPage{

constructor(page)
{
    this.page = page;
    this.signinButton = page.locator('input#login');
    this.emailID = page.locator('input#userEmail');
    this.password = page.locator('input#userPassword');
}

async gotoURL()
{
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

}


async validLogin(email,password)
{
    await this.emailID.fill(email);
    await this.password.fill(password);
    await this.signinButton.click();
    await this.page.waitForLoadState('networkidle');

}
}
module.exports = {LoginPage};