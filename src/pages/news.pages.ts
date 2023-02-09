import Page from "../baseClassess/form.js";

class NewsPage extends Page{
    constructor(){
        super('News page',"//div[@id='main_feed']")
    }
}

export default new NewsPage();