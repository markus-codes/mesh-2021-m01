import { template } from './requests'

export const routes = {

    getData: (id: string) => 
        template('/test/getData', {
            'id' : id
        }),
    getData2: (id2: string) => 
        template('/test/getData2', {
            'id2' : id2
        })

}