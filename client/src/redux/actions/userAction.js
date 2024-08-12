import axios from 'axios';
const server=import.meta.env.VITE_SERVER

export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:'loginRequest'})
        const {data}=await axios.post(`${server}/auth/login`,
            {email,password},
            {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true,
            }
        )
        dispatch({type:'loginSuccess',payload:data})
    } catch (error) {
        dispatch({type:'loginFail',payload:error.response?.data?.message || 'An error occurred'})
    }
}


export const register=(name,email,password)=>async(dispatch)=>{
    try{
        dispatch({type:'registerRequest'})
        const payload={name,email,password}
        const {data}=await axios.post(`${VITE_SERVER}/auth/register`,payload,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })
        dispatch({type:'registerSuccess',payload:data})
    }catch(error){
        dispatch({type:'registerFail',payload:error.response?.data?.message || 'An error occurred'})
    }
}