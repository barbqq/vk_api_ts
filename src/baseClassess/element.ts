import report from '@wdio/allure-reporter';

export default class MyElement {

    private name: string
    private elementLocator: string

    constructor(name: string, elementLocator: string) {
        this.name = name;
        this.elementLocator = elementLocator;
    }

    get getElement() { return $(this.elementLocator) }

    get getElements() { return $$(this.elementLocator) }

    public async click() {
        report.addStep(`Clicking ${this.name}`);
        let element = await this.getElement;
        await element.waitForDisplayed();
        await element.click();
    }

    public async getText() {
        report.addStep(`Getting text from ${this.name}`);
        let element = await this.getElement;
        await element.waitForDisplayed();
        return element.getText();
    }

    public async sendText(value: string) {
        report.addStep(`Sending text ${value} to ${this.name}`);
        let element = await this.getElement;
        await element.waitForDisplayed();
        await element.clearValue();
        await element.setValue(value);
    }

    public async isElementPresent(reverse: boolean = false) {
        report.addStep(`Checking presens of ${this.name}`);
        let element = await this.getElement;
        return element.waitForDisplayed({ reverse: reverse });
    }

    public async getAttribute(value: string) {
        report.addStep(`Getting ${this.name} attribute ${value}`);
        let element = await this.getElement;
        return element.getAttribute(value);
    }
}