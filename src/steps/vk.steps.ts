import Post from "../models/post.js"
import commonUtils from "../utils/common.utils.js"
import assertionUtils from "../utils/assertion.utils.js"
import mainPage from "../pages/main.page.js"
import loginPage from "../pages/login.page.js"
import NewsPage from "../pages/news.pages.js"
import sideBarForm from "../pages/sidebar.form.js"
import myprofilePage from "../pages/myprofile.page.js"
import vkApi from "../api/vk.api.js"
import UploadedPhoto from "../models/uploaded.photo.js"
import StatusCodes from 'http-status-codes'
import testData from "../resources/testdata.json" assert { type: "json" };


class VKSteps {
    private post = new Post()
    async loginToMyPage() {
        commonUtils.addLog("--Logging to VK page--")
        assertionUtils.toEqual(true, await mainPage.isPageOpened(), "Main page should be opened")
        await mainPage.inputPhone(testData.login)
        await mainPage.clickSignInButton()
        assertionUtils.toEqual(true, await loginPage.isPageOpened(), "Login page should be opened")
        await loginPage.inputPassword(testData.password)
        await loginPage.clickContinueBtn();
        assertionUtils.toEqual(true, await NewsPage.isPageOpened(), "News page should be opened")
        await sideBarForm.clickMyProfileBtn()
        assertionUtils.toEqual(true, await myprofilePage.isPageOpened(), "News page should be opened")
    }

    async createPost() {
        commonUtils.addLog("--Creating post--")
        const randomString: string = commonUtils.generateRandomString(testData.random_string_len)
        this.post.message = randomString
        await vkApi.createTextMessageWall(randomString)
            .then(resp => {
                assertionUtils.toEqual(StatusCodes.OK, resp.status, "Status code should be OK")
                this.post.id = resp.data.response.post_id
            })
        assertionUtils.toEqual(true, await myprofilePage.checkPostCreated(randomString), "Post text should be equal")
        assertionUtils.toContain(await myprofilePage.getPostAttribute(randomString), testData.owner_id, "Post attribute should contain owner id")
    }

    async addComment() {
        commonUtils.addLog("--Adding comment--")
        const randomString: string = commonUtils.generateRandomString(testData.random_string_len)
        await vkApi.addComment(randomString, this.post.id)
            .then(resp => {
                assertionUtils.toEqual(StatusCodes.OK, resp.status, "Status code should be OK")
            })
        await myprofilePage.clickShowCommentButton(this.post.message);
        assertionUtils.toContain(await myprofilePage.getPostAttribute(randomString), testData.owner_id, "Comment attribute should contain owner id")
    }

    async addLike() {
        commonUtils.addLog("--Adding like to post--")
        await myprofilePage.clickLikeBtn(this.post.message);
        await vkApi.checkLikes(testData.owner_id, 'post', this.post.id)
            .then(resp => {
                assertionUtils.toEqual(StatusCodes.OK, resp.status, "Status code should be OK")
                assertionUtils.toEqual(testData.number_of_likes, 1, "Post should be liked");
            })
    }

    async deletePost(){
        commonUtils.addLog("--Deleting post--")
        await vkApi.deletePost(this.post.id)
        .then(resp => {
            assertionUtils.toEqual(StatusCodes.OK, resp.status, "Status code should be OK")
        })
        //assertionUtils.toEqual(true,myprofilePage.checkPostExistence(this.post.message),"Post should not be displayed")
    }

    async editComment(){
        commonUtils.addLog("--Editing post--")
        await this.updatePostStep()
        await this.compareImages()
    }

    private async updatePostStep(){
        commonUtils.addLog("--Updating post--")
        const uploadedPhoto : UploadedPhoto = await vkApi.uploadWallPhoto(testData.expected_image_path)
        const savedPhoto = await vkApi.saveUploadedWallPhoto(uploadedPhoto)
        const randomString = commonUtils.generateRandomString(testData.random_string_len)
        this.post.message = randomString
        const response = await vkApi.updatePost(randomString,savedPhoto.response[0].id,this.post.id)
        assertionUtils.toEqual(true, await myprofilePage.checkPostCreated(randomString), "Post text should be equal")
    }

    private async compareImages(){
        commonUtils.addLog("--Comparing images--")
        const url = await myprofilePage.getImageUrl(this.post.message)
        await commonUtils.createImageFromUrl(url,testData.actual_image_path)
        await myprofilePage.clickCloseBtn()
        //assertionUtils.toEqual(true,await commonUtils.areEqual(testData.expected_image_path,testData.actual_image_path))
    }
}

export default new VKSteps()
