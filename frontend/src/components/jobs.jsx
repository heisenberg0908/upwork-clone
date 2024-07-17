import { useState } from 'react';
import { Button } from "./button";
import { Button1 } from "./button1";
import axios from 'axios';

export const JobsCard = ({ title, description, budget, location, time, skill1, skill2, skill3, skill4, skill5, postedon, jobId }) => {
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');

    const applyForJob = async () => {
        try {
         // Assuming token is stored in localStorage
            const response = await axios.post('http://localhost:3000/api/v1/jobs/apply', {
                jobId,
                coverLetter
            });

            console.log(response.data);
            setShowApplyForm(false);
        } catch (error) {
            console.error("Error applying for job:", error);
        }
    };

    return (
        <div className="p-2 bg-white-200 border-4">
            <div className="border-b p-4">
                <div className="p-2 text-sm font-serif font-thin">posted on {new Date(postedon).toLocaleDateString()}</div>
                <div className="p-2 text-2xl font-serif font-normal">{title}</div>
                <div className="p-2 text-sm font-serif font-thin">
                    Est Budget: {budget} | Est Time: {time}
                </div>
                <div className="p-2 text-xl font-serif font-thin">{description}</div>
                <div className="flex p-2">
                    <Button1 placeholder={skill1} />
                    <Button1 placeholder={skill2} />
                    <Button1 placeholder={skill3} />
                    <Button1 placeholder={skill4} />
                    <Button1 placeholder={skill5} />
                </div>
                <div className="flex justify-between">
                    <div className="p-2 text-xl font-serif font-thin">Location: {location}</div>
                    <div className="p-2">
                        <Button
                            onClick={() => setShowApplyForm(true)}
                            placeholder={"Apply"}
                        />
                    </div>
                </div>
            </div>
            {showApplyForm && (
                <div className="p-4 bg-green-200">
                    <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Cover letter"
                        className="w-full p-2 border"
                    />
                    <Button onClick={applyForJob} placeholder="Submit Application" />
                    <Button onClick={() => setShowApplyForm(false)} placeholder="Cancel" />
                </div>
            )}
        </div>
    );
};

export default JobsCard;
