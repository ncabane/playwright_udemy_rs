class LoginPage {
constructor(page)
{
    this.page = page;
    this.signInbutton = page.locator("[value='Login']");
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");

}

async goTo()

{
    await this.page.goTo("https://rahulshettyacademy.com/client");
}

async validLogin(userName, password)
{
    await this.userName.type(this.userName);
    await this.password.type(password);
    await this.SignInButton.click();
}
}
module.exports = {LoginPage}