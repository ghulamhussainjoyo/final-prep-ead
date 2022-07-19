

import {

    REGISTER_ADMIN_FAIL,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_REQUEST,
} from '../constant/user'

import axios from 'axios'
import {apiUrl} from '../../service/http'

export const registerUserAction = (form)=> dispatch=>
{
   

    try {
        
        dispatch({type:REGISTER_ADMIN_REQUEST});

        const {data} = axios.post(apiUrl)
        dispatch({type:REGISTER_ADMIN_SUCCESS,payload:data})
    } catch (error) 
    {
        dispatch({type:REGISTER_ADMIN_FAIL,payload:error})    
    }
}