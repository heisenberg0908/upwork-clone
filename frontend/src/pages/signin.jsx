import { Button } from '../components/button'
import { InputBar } from "../components/inputbar"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signin = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSignin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/users/signin', {
                userName,
                password
            })
            localStorage.setItem('token',response.data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            navigate('/jobs')
        } catch (error) {
            setError("Sign-in failed. Please check your credentials and try again.")
            console.error(error)
        }
    }

    return (
        <div className="p-4 ">
            <div className="flex justify-center">
                <div className="h-42 w-42 border-2 rounded-2xl p-2">
                    <div className="justify-center">
                        <div className="font-serif text-3xl font-semibold text-green-500  flex justify-center p-2">FlexTask</div>
                        <div className="font-serif text-2xl font-thin flex justify-center p-2">Signin</div>
                        <div className="p-4">
                            <InputBar
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="e.g., johncena@gmail.com"
                                label="UserName or Email"
                            />
                            <InputBar
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="e.g., 111111111"
                                label="Password"
                            />
                        </div>
                    </div>
                    <div className="p-3 flex justify-center">
                        <Button onClick={handleSignin} placeholder="Signin" />
                    </div>
                    {error && <div className="text-red-500 text-center mt-2">{error}</div>}
                </div>
            </div>
        </div>
    )
}
