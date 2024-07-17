import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JobsCard from "../components/jobs"; // Make sure the path is correct for JobsCard

export const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/jobs/all');
                const allJobs = response.data.allJobs.map(job => ({
                    ...job,
                    skills: [job.skill1, job.skill2, job.skill3, job.skill4, job.skill5].filter(Boolean)
                }));
                setJobs(allJobs || []);
                console.log(allJobs);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                // Handle error state or notification to the user
            }
        };

        fetchJobs();
    }, []);

    return (
        <div>
            <div className="border-b justify-between flex">
                <div className="flex">
                    <div className="text-2xl font-semibold text-green-500 p-3">Upwork</div>
                    <div className="text-xl font-medium p-3">Find work</div>
                    <div className="text-xl font-medium p-3">Deliver work</div>
                    <div className="text-xl font-medium p-3">Messages</div>
                    <div
                        onClick={() => navigate('/postjob')}
                        className="text-xl font-medium p-3 hover:bg-green-500 cursor-pointer"
                    >
                        Post Jobs
                    </div>
                </div>
                <div className="flex">
                    <div className="p-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    </div>
                    <div className="p-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                        </svg>
                    </div>
                    <div onClick={() => navigate('/myprofile')} className="p-3 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="p-4 text-2xl text-slate-700 font-serif">Jobs You Might Like</div>
            <div>
                {jobs.length > 0 ? 
                    jobs.map(job => (
                        <JobsCard
                            key={job._id}
                            title={job.title}
                            description={job.description}
                            budget={job.budget}
                            time={job.time}
                            location={job.location}
                            skill1={job.skill1}
                            skill2={job.skill2}
                            skill3={job.skill3}
                            skill4={job.skill4}
                            skill5={job.skill5}
                            postedon={job.postedon}
                        />
                    )) 
                    : 'No jobs available'
                }
            </div>
        </div>
    );
};
