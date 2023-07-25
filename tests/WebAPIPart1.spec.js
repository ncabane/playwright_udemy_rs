const {test, expect, request} = require('@playwright/test');
const loginPayLoad = {"userEmail":"anshika@gmail.com","userPassword":"Iamking@000"}
let token;

test.beforeAll( async() =>
{
   const apiContext = await request.newContext();
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
   data:loginPayLoad
    })

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);

});


test.beforeEach( () =>
{

});


test('@Gen Client App login', async ({page})=>
{

    page.addInitScript(value => {
      window.localStorage.setItem('token',value);
    }, token );
    const email = "";
    const productName = 'Zara Coat 4';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
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
  const rows = page.locator("tbody tr");


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

