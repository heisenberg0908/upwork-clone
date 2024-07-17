import { InputBar } from "../components/inputbar"
import { Button } from "../components/button"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const Postjob=()=>{
    const [title,settitle]=useState("")
    const [description,setdescription]=useState("")
    const [budget,setbudget]=useState("")
    const [location,setlocation]=useState("")
    const [time,settime]=useState("")
    const [skill1,setskill1]=useState("")
    const [skill2,setskill2]=useState("")
    const [skill3,setskill3]=useState("")
    const [skill4,setskill4]=useState("")
    const [skill5,setskill5]=useState("")
    const [error,seterror]=useState("")
    const [success,setsuccess]=useState("")
    const navigate=useNavigate()

    
    const posthandler = async () => {
      try {
          const post = await axios.post('http://localhost:3000/api/v1/jobs/postjob', {
              title,
              description,
              budget,
              location,
              time,
              skill1,
              skill2,
              skill3,
              skill4,
              skill5
          });

          const response = post.data;
          if (response.status === 200) {
              setsuccess("Job posted successfully");
              seterror(null); // Clear any previous error message
          } else {
              seterror("Failed to post job");
              setsuccess(null); // Clear any previous success message
          }
          console.log(response);
      } catch (error) {
          seterror("An error occurred while posting the job");
          setsuccess(null); // Clear any previous success message
          console.log(error);
      }
  };

    return <div>
        <div>
            <div className="border-b p-3 flex justify-between">
                <div className="flex">
                <div className="font-serif p-3 text-3xl font-thin text-green-500">Upwork</div>
                <div onClick={()=>{
                    navigate('/jobs')
                }} className="font-serif text-xl hover:bg-green-500 text-slate-600 p-3 font-normal">Find Work</div>
                <div className="font-serif text-xl text-slate-600 p-3 font-normal">Find Top Talents</div>
                <div onClick={()=>{
                  navigate('/jobspostedbyme')
                }} className="font-serif text-xl hover:bg-green-500 text-slate-600 p-3 font-normal">Your Jobs</div>
                </div>
                <div className="flex">
                    <div className="p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    </div>
                    <div className="p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    </div>
                    <div className="p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    </div>
                </div>
            </div>
            <div className="flex text-4xl text-slate-700 flex justify-center p-4">Post a Job</div>
            <div className="w-1/2 p-4">
              <InputBar onChange={(e)=>{
                settitle(e.target.value)
              }} placeholder={"eg:Need a Cloud Engineer "} label={"Title"}/> 
              <InputBar onChange={(e)=>{
                setdescription(e.target.value)
              }} placeholder={"eg: To set up cloud environment."} label={"Description"}/>
              <InputBar onChange={(e)=>{
                setbudget(e.target.value)
              }} placeholder={"eg: $100 etc."} label={"Budget"}/>
              <InputBar onChange={(e)=>{
                setlocation(e.target.value)
              }} placeholder={"Location"} label={"Location"}/>
              <InputBar onChange={(e)=>{
                    settime(e.target.value)
              }} placeholder={"eg: 1 month etc."} label={"Time"}/>
              <InputBar onChange={(e)=>{
                setskill1(e.target.value)
              }} placeholder={"eg: React,Nodejs,AWS etc"} label={"Enter 1st Skill Required"}/>
              <InputBar onChange={(e)=>{
                setskill2(e.target.value)
              }} placeholder={"eg: React,Nodejs,AWS etc"} label={"Enter 2nd Skill Required"}/>
              <InputBar onChange={(e)=>{
                setskill3(e.target.value)
              }} placeholder={"eg: React,Nodejs,AWS etc"} label={"Enter 3rd Skill Required"}/>
              <InputBar onChange={(e)=>{
                setskill4(e.target.value)
              }} placeholder={"eg: React,Nodejs,AWS etc"} label={"Enter 4th Skills Required"}/>
              <InputBar onChange={(e)=>{
                setskill5(e.target.value)
              }} placeholder={"eg: React,Nodejs,AWS etc"} label={"Enter 5th Skill Required"}/>
            </div>
        </div>
        <div className="flex justify-center">
            <Button onClick={posthandler} placeholder={"Post Job"}/>
        </div>
        <div>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        {success && <div className="text-green-500 text-center mt-2">{success}</div>}
        </div>
    </div>
}