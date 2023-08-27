const {LoginPage} = require('./LoginPage');
const { DashboardPage } = require("./DashBoardPage");
class POManager 
{
    constructor(page)
    {
     this.page = page;
     this.loginPage = new LoginPage(this.page);
     this.dashboardPage = new DashboardPage(this.page);
    }
}
getLoginPage()
{
    return this.loginPage;ß
}
getDashboardPage()
{
    return this.DashboardPage
}
module.exports = {POManager}