import report from '@wdio/allure-reporter';
import httpUtils from './http.utils.js';
import Jimp from 'jimp';

class CommonUtils {
    public addLog(value: string) {
        report.addStep(`STEP: ${value}`);
        console.log(`STEP: ${value}`);
    }

    public generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public async createImageFromUrl(url: string, localPath: string) {
        await httpUtils.uploadImage(url, localPath)
    }

    public async areEqual(actualPath: string, expectedPath: string) {
        const actual : Jimp = await Jimp.read(actualPath)
        const expected : Jimp = await Jimp.read(expectedPath)
        const pixelDifference : number = Jimp.diff(actual, expected).percent;
        const distance : number = Jimp.distance(actual, expected);
        if (distance < 0.20 || pixelDifference < 0.20) {
            return true;
        } else {
            return false;
        }
    }
}

export default new CommonUtils()