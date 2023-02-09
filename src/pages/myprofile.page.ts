import Page from "../baseClassess/form.js";
import TextBox from "../elements/textbox.element.js";
import Button from "../elements/button.element.js";
import Label from "../elements/label.element.js";
import { parameterizedLocators, locators } from "../locators/locators.js";
import testData from "../resources/testdata.json" assert { type: "json" };


class MyProfilePage extends Page {

    private openedImage = new Label("Opened image", locators.imgLoc)
    private closeBtn = new Button("Close button", locators.closeBtnLoc)

    constructor() {
        super('My profile page', locators.myProfilePageLoc)
    }

    async checkPostCreated(value: string, reverse?: boolean) {
        let wallPost = new TextBox("Post text", parameterizedLocators.post(value))
        return wallPost.isElementPresent()
    }

    async checkPostExistence(value: string) {
        let wallPost = new TextBox("Post text", parameterizedLocators.post(value))
        const test = await wallPost.isElementPresent(true)
        return test;
    }

    async getPostAttribute(value: string): Promise<string> {
        let wallPostParent = new TextBox("Post", parameterizedLocators.post(value, locators.parentDiv))
        return wallPostParent.getAttribute(testData.post_id_attr);
    }

    async clickLikeBtn(value: string): Promise<void> {
        let likeBtn = new Button("Like button", parameterizedLocators.post(value, locators.clickLikeLoc))
        likeBtn.click()
    }

    async clickShowCommentButton(value: string): Promise<void> {
        let showCommentBtn = new Button("Show comment button", parameterizedLocators.post(value, locators.checkCommentLoc))
        showCommentBtn.click()
    }

    async getImageUrl(value: string) {
        const wallPostImage = new Label("Image", `//div[contains(text(),'${value}')]//parent::div//a`)
        await wallPostImage.click()
        return this.openedImage.getAttribute(testData.image_attr)
    }

    async clickCloseBtn() {
        await this.closeBtn.click()
    }
}

export default new MyProfilePage();