
import axios, { AxiosResponse } from "axios";
import { VkEndpoints } from "../enums/vkapi.enum.js";
import fs from 'fs'
import path from 'path';
import FormData from 'form-data'
import apiData from "../resources/vk.endpoints.json" assert { type: "json" };
import commonUtils from "../utils/common.utils.js";
import httpUtils from "../utils/http.utils.js";
import { Params } from "../customtypes/cutsom.types";
import UploadedPhoto from "../models/uploaded.photo.js";

axios.defaults.baseURL = apiData.vk_api_url

class VKApiUtils {

    async createTextMessageWall(text: string): Promise<AxiosResponse> {
        commonUtils.addLog("Creating post API method")
        let params = this.commonParams();
        params.message = text
        return httpUtils.sendPost(VkEndpoints.CREATE_POST, null, params)
    }

    async addComment(value: string, postId: string): Promise<AxiosResponse> {
        commonUtils.addLog("Adding comment API method")
        let params = this.commonParams();
        params.post_id = postId;
        params.message = value;
        return httpUtils.sendPost(VkEndpoints.CREATE_COMMENT, null, params)
    }

    async checkLikes(owner: string, type: string, id: string): Promise<AxiosResponse> {
        commonUtils.addLog("Checking like API method")
        let params = this.commonParams();
        params.owner = owner
        params.type = type;
        params.item_id = id;
        return httpUtils.sendPost(VkEndpoints.CHECK_LIKES, null, params)
    }

    async deletePost(id: string) {
        commonUtils.addLog("Deleting post API method")
        let params = this.commonParams();
        params.item_id = id;
        return httpUtils.sendPost(VkEndpoints.DELETE_POST, null, params)
    }

    private async getWallPhotoUploadServer() {
        commonUtils.addLog("Geting wall upload server link")
        let params = this.commonParams();
        const response = await httpUtils.sendPost(apiData.vk_api_url + VkEndpoints.GET_WALL_UPLOAD_URL, null, params)
        return response.data
    }

    async uploadWallPhoto(filePath: string) {
        commonUtils.addLog("Uploading photo")
        const file = fs.createReadStream(path.resolve(filePath))
        const formData = new FormData()
        formData.append(apiData.type_of_upload_file, file)
        const urlResp = await this.getWallPhotoUploadServer()
        const resp = await httpUtils.upload(urlResp.response.upload_url, formData)
        return resp.data
    }

    async saveUploadedWallPhoto(photo: UploadedPhoto) {
        commonUtils.addLog("Saving uploaded photo")
        let params = this.commonParams();
        params.photo = photo.photo
        params.server = photo.server
        params.hash = photo.hash
        const resp = await httpUtils.sendPost(VkEndpoints.SAVE_WALL_PHOTO, null, params)
        return resp.data
    }

    async updatePost(text: string, photoId: string, postId: string) {
        commonUtils.addLog("Updating post")
        let params = this.commonParams();
        params.post_id = postId;
        params.message = text
        params.attachments = apiData.type_of_upload_file + apiData.owner_id + "_" + photoId
        const resp = await httpUtils.sendPost(VkEndpoints.EDIT_WALL_PHOTO, null, params)
        return resp.data
    }



    commonParams(): Params {
        let params: Params = {
            access_token: apiData.token,
            v: apiData.api_version,
            owner_id: apiData.owner_id
        };
        return params;
    }
}

export default new VKApiUtils()