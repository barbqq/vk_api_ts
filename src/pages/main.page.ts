import Page from "../baseClassess/form.js";
import Button from "../elements/button.element.js";
import TextBox from "../elements/textbox.element.js";

class MainPage extends Page {
    private signInBtn = new Button("Sign in button", "//button[contains(@class,'VkIdForm__signInButton')]")
    private phoneInput = new TextBox("Phone input", "//input[@name='login']")

    constructor(){
        super('Main page','//div[@class="VkIdForm__header"]')
    }

    public async clickSignInButton(){
        await this.signInBtn.click();
    }

    public async inputPhone(login : string){
        await this.phoneInput.sendText(login);
    }
}

export default new MainPage()

