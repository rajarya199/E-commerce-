import { API } from "../config"

//for signup

export const signup=user=>{
    return fetch(`${API}/register`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)  
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}
//signin
export const signin=user=>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)  
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}
//authenticate -store user info,token accodingly
export const authenticate=(data,next)=>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()

    }
}
// redirect user by role if authenticated
export const isAuthenticated=()=>{
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}

//