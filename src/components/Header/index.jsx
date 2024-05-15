import React, { useEffect } from 'react'
import "./style.css"
import { auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
const Header = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            navigate("/dashboard")
        }
    },[user,loading])
    function logoutFnc(){
        signOut(auth).then(()=>{
            toast.success("Logged out!");
            navigate("/")
        }).catch((error)=>{
            toast.error(error.message)
        })
    }
  return (
    <div className='nav'>
        <p className='logo'>Financely</p>
        {user && <p onClick={logoutFnc} className='link'>Logout</p>}
    </div>
  )
}

export default Header