import Form from "../baseClassess/form.js";
import Button from "../elements/button.element.js";

class SideBarForm extends Form {
    private myProfileBtn = new Button("My profile button","//li[@id='l_pr']")

    constructor(){
        super('Side bar form',"//div[@id='side_bar_inner']")
    }

    public async clickMyProfileBtn(){
        await this.myProfileBtn.click()
    }
}

export default new SideBarForm()