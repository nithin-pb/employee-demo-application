import {useEffect, useState} from 'react';


export default function useAxiosRequest(request) {
    const [state, setState] = useState({loading: false, data: [], error: false})

    useEffect(() => {
        setState({loading: true, data: [], error: false})
        request().then(e => setState({
            loading: false,
            data: e.data,
            error: false
        })).catch((err) => setState({loading: false, data: [], error: true}))
    }, [])
    return state
}