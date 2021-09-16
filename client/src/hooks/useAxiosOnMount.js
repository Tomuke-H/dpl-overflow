import {useState, useEffect } from 'react'
import axios from 'axios'

const useAxiosOnMount = (url) => {
     const [data, setData] = useState([])
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            setError(null)
            let res = await axios.get(url)
            setData(res.data)
        }catch (err){
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return {data, loading, error}
    
}

export default useAxiosOnMount;