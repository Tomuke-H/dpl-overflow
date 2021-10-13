import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../providers/AuthProvider'

const FetchUser = (props) => {
    let {user, setUser} = useContext(AuthContext)
    let [checked, setChecked] = useState(false)

    useEffect(()=>{
        checkUser();
    },[])

    const checkUser = async () => {
        if(user || !localStorage.getItem("access-token")){
            setChecked(true)
            return
        }

        try {
            let res = await axios.get("/api/auth/validate_token")
            setUser(res.data.data)
        } catch (err) {  
        } finally {
            setChecked(true)
        }
    }

    return checked ? props.children : null;
}

export default FetchUser;