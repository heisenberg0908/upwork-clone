import { Button } from "../components/button"
import { InputBar } from "../components/inputbar"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"




export const Signup=()=>{
    const [firstName,setfirstName]=useState("")
    const [lastName,setlastName]=useState("")
    const [userName,setuserName]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate()
    const [error,seterror]=useState("")

    const handleSignup=async()=>{
        try {
            const response=await axios.post('http://localhost:3000/api/v1/users/signup',{
                firstName,
                lastName,
                userName,
                password
            })
                localStorage.setItem('token',response.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                navigate('/jobs')
            }catch (error) {
                seterror(error)
                console.error('something happened try again',error)
        }
    }



    return <div className="p-4">
     <div className="flex justify-center">
    <div className=" h-42 w-42 border-2 rounded-2xl p-2 ">
        <div className="justify-center ">
            <div className="font-serif text-3xl font-semibold flex text-green-500 justify-center p-2">FlexTask</div>
            <div className="font-serif text-2xl font-thin flex text-slate-600 justify-center p-2">Signup</div>
            <div className="p-4">
            <InputBar className="text-white" onChange={(e)=>{
                setfirstName(e.target.value)
            }} placeholder={"eg John"} label={"First Name"}/>
            <InputBar onChange={(e)=>{
                setlastName(e.target.value)
            }} placeholder={"eg Cena"} label={"Last Name"}/>
            <InputBar onChange={(e)=>{
                setuserName(e.target.value)
            }} placeholder={"eg johncena@gmail.com"} label={"UserName or Email"}/>
            <InputBar onChange={(e)=>{
                setpassword(e.target.value)
            }} placeholder={"eg 111111111"} label={"Password"}/>
            </div>
        </div>
        <div className="p-3 flex justify-center">
            <Button onClick={handleSignup} placeholder={"Signup"}/>
        </div>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
    </div>
    </div> 
    </div>
}