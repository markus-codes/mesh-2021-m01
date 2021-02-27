import * as requests from '../api/requests'
import { dataMock } from '../mocks/dataMock'

export async function getData(id: string): Promise<string | undefined> {
    const test = true

    const response = test ? dataMock : await requests.fetchData(requests.queryTemplates.getData(id))
    return response
}