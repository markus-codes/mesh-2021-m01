import axios from 'axios'
import { queryString } from '../util'
import { routes } from './routes'

export async function fetchData(url:string, variante = 'GET'): Promise<string> {
    const response = await request(url, variante)
    return response
}

async function request(url:string, variante:string): Promise<string> {
    switch(variante) {
        case 'POST': {
            return await axios.post(url)
        }
        default: return await axios.get(url)
    }
}

interface queryStringInterface {
    [key: string]: string
}

export function template(path:string, params: queryStringInterface) {
    const url = path + queryString(params)
    return url
}

export const queryTemplates = routes