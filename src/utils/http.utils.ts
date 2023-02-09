import axios, { AxiosRequestConfig } from "axios";
import FormData from "form-data";
import fetch from 'node-fetch'
import fs from 'fs'

class HttpUtils {
    async sendPost(path: string, config: AxiosRequestConfig, params) {
        const resp = await axios.post(path, config, { params: params })
        return resp
    }

    async upload(url: string, formData: FormData) {
        return axios.post(url, formData)
    }

    async uploadImage(src: string, path: string) {
        const response = await fetch(src);
        const buffer = await response.buffer();
        fs.writeFile(path, buffer, () =>
            console.log('finished downloading!'));
    }


}

export default new HttpUtils();