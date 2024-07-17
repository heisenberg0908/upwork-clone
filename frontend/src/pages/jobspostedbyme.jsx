import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import JobsCard1 from "../components/jobs1";
import axios from "axios";
import { useEffect, useState } from "react";

export const PostedJobsByMe = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/jobs/jobspostedbyme');
                console.log(response.data);
                setJobs(response.data.jobs); // Extract the jobs array from the response
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetch();
    }, []);

    return (
        <div>
            <div className="border-b p-4 flex justify-between">
                <div className="font-serif text-3xl font-semibold text-green-500 p-4">Upwork</div>
                <div className="flex p-4">
                    <Button onClick={() => navigate('/jobs')} placeholder={"Find Jobs"} />
                    <Button onClick={() => navigate('/postjobs')} placeholder={"Post Jobs"} />
                    <Button onClick={() => navigate('/profile')} placeholder={"Profile"} />
                </div>
            </div>
            <div className="p-4 font-serif text-4xl text-slate-700 justify-center flex">Jobs Posted By You</div>
            <div>
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <JobsCard1
                            key={job._id} 
                            title={job.title} 
                            description={job.description} 
                            budget={job.budget} 
                            location={job.location} 
                            time={job.time} 
                            skill1={job.skill1} 
                            skill2={job.skill2} 
                            skill3={job.skill3} 
                            skill4={job.skill4} 
                            skill5={job.skill5} 
                            postedon={job.postedon}
                        />
                    ))
                ) : (
                    <div className="p-4 text-center">No jobs posted by you.</div>
                )}
            </div>
        </div>
    );
};
