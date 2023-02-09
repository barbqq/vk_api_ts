export type Params = {
    access_token: string,
    v: string,
    owner_id: string,
    [key: string]: string
}

export type NewPost = {
    message : string
    id : string
}