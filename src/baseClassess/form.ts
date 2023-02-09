import report from '@wdio/allure-reporter';

export default class Page {
    private name: string
    private pageElementLocator: string
    constructor(name: string,pageElementLocator:string) {
            this.name = name;
            this.pageElementLocator = pageElementLocator;
    }

    private get pageElement()  { return $(this.pageElementLocator)}

    async isPageOpened() {
        report.addStep(`Checking if ${this.name} is opened`);        
        let element = await this.pageElement;
        await element.waitForDisplayed({ timeout: 100000 });
        return element.isDisplayed();
    }

}