interface queryStringInterface {
    [key: string]: string
}

export function queryString(params: queryStringInterface) {
    if(!params) {
        return ''
    }
    return '&' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}