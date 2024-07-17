import { Button } from "./button";
import { Button1 } from "./button1";

export const JobsCard1 = ({ title, description, budget, location, time, skill1,skill2,skill3,skill4,skill5, postedon }) => {
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
                    <Button1 placeholder={skill1}/>
                    <Button1 placeholder={skill2}/>
                    <Button1 placeholder={skill3}/>
                    <Button1 placeholder={skill4}/>
                    <Button1 placeholder={skill5}/>
                </div>
                <div className="flex justify-between">
                    <div className="p-2 text-xl font-serif font-thin">Location: {location}</div>
                    <div className="p-2">
                        <Button
                            onClick={() => {
                                console.log('Apply button clicked');
                                // Add your apply logic here
                            }}
                            placeholder={"Remove Job"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsCard1;
