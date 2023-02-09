import Page from "../baseClassess/form.js";
import Button from "../elements/button.element.js";
import TextBox from "../elements/textbox.element.js";

class LoginPage extends Page {
    private continueBtn = new Button("Continue button","//button[@type='submit']")
    private passwordInput = new TextBox("Password input","//input[@name='password']")

    constructor(){
        super('Login page',"//div[@class='vkc__StepInfo__body']")
    }

    public async clickContinueBtn(){
        await this.continueBtn.click()
    }

    public async inputPassword(password : string){
        await this.passwordInput.sendText(password)
    }
}

export default new LoginPage()