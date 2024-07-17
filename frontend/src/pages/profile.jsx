import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Profile = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/users/profile');
                console.log(response.data);
                setInfo(response.data); // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <div className="border-b flex justify-between">
                <div className="font-serif p-4 text-3xl font-semibold text-green-500">Upwork</div>
                <div className="flex">
                    <div className="p-4">
                        <Button onClick={() => navigate('/jobs')} placeholder={"Find Jobs"} />
                    </div>
                    <div className="p-4">
                        <Button onClick={() => navigate('/postjob')} placeholder={"Post jobs"} />
                    </div>
                </div>
            </div>
            <div className="p-4 justify-center font-semibold flex text-slate-700 text-4xl">Your Profile</div>
            <div className="p-4">
                {/* Display the profile info */}
                <p className="font-serif text-xl font-normal text-slate-700">First Name: {info.fname}</p>
                <p className="font-serif text-xl font-normal text-slate-700">Last Name: {info.lname}</p>
                <p className="font-serif text-xl font-normal text-slate-700">User Name: {info.userName}</p>
            </div>
        </div>
    );
};
