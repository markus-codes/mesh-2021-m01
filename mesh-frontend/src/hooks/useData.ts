import { useCallback, useEffect, useState } from 'react'
import { getData } from '../core/data'

export function useData(id: string) {
    const [data, setData] = useState<string>()

    const loadData = useCallback(() => {
        getData(id).then(data => {
            setData(data)
        })
    }, [id])

    useEffect(() => {
        if(id === null) {
            setData(undefined)
        } else {
            loadData()
        }
    }, [id])

    return {
        data
    }
}