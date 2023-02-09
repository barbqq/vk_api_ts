import VKSteps from "../src/steps/vk.steps.js"


describe("Tests of VK UI and VK API", function () {
    before(async () => {
        await browser.maximizeWindow()
        await browser.url("/")
    })
    after(async () => {
        await browser.reloadSession();
    });
    it("Tests of VK UI and VK API", async function () {
        await VKSteps.loginToMyPage()
        await VKSteps.createPost()
        await VKSteps.addComment()
        await VKSteps.editComment()
        // await VKSteps.addLike()
        // await VKSteps.deletePost()
    })
})