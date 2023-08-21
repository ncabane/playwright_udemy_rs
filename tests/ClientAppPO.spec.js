
const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage')
test.only('@Gen Client App login', async ({page})=>
{

    // login file js, dashboard
    const username = "anshika@gmail.com";
    const password = "Iamking@000"
    const productName = 'Zara Coat 4';
    const products = page.locator(".card-body");
    const loginPage = new LoginPage(page);
    loginPage.goTo();
    loginPage.validLogin(username,password)
    await page.waitForLoadState('networkidle');
    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
        for(let i =0; i < count; ++i)
      {
      if(await products.nth(i).locator("b").textContent() === productName)
      {
          //add to cart
          await products.nth(i).locator("text= Add To Cart").click();
          break;
        }
      }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('Zara Coat 4')").isVisible();
   expect(bool).toBeFalsy();
   await page.locator("text=Checkout").click();
   await page.locator("[placeholder*='Country']").type("ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   dropdown.locator("button").count();
   const optionsCount = await dropdown.locator("button").count();
   for(let i = 0;i< optionsCount; ++i)
   {
    const text = await dropdown.locator("button").nth(i).textContent();
     if(text.trim() === "India")
     {
      await dropdown.locator("button").nth(i).click();
      break;
     }
   }
   await expect(page.locator(".user__name [type='text']")).toHaveText(email);
   await page.locator(".action__submit").click();

   await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order");
  const orderId =  await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");


  for(let i =  0; i<await rows.count(); ++i);
  {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId))
    {
      await rows.nth(i).locator("button").first().click();
      
    } 
  }
const orderDetails = await page.locator(".col-text").textContent();
expect(orderId.includes(orderDetails)).toBeTruthy();
});