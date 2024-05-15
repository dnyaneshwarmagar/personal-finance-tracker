import React from 'react'
import './style.css'
const Input = ({label,state,setState,placeholder,type}) => {
  return (
    <div className='input_wrapper'>
        <p>{label}</p>
        <input type={type} value={state} placeholder={placeholder} onChange={(e)=>setState(e.target.value)}/>
    </div>
  )
}

export default Input