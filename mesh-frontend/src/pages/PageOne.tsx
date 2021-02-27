import { useData } from '../hooks'
import { PageOneComponent } from '../components/text/PageOneComponent'

export function PageOne() {

    const { data } = useData('1')

    return (
        <PageOneComponent
            data={data}
         />
    )
}