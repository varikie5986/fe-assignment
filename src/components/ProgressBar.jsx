import React, {useEffect, useState} from "react";
import cssLogo from "../assets/logo/cssLogo.png";

const ProgressBar = ({ value, name }) => {
    const [width, setWidth] = useState(`${Math.min(value, 100)}%`);

    useEffect(() => {
        const newWidth = `${Math.min(value, 100)}%`;
        setWidth(newWidth);
    }, [value]);

    return (
        <div className={`bg-[#FFFFFF] min-w-[656px] min-h-[140px] rounded-[16px] drop-shadow-[0_0px_7px_rgba(0,0,0,0.15)] flex`}>
            <div className={"flex items-center justify-center m-[15px]"}>
                <img className={"w-[80px] h-[80px]"} src={cssLogo} alt="CSS Logo"/>
            </div>
            <div className={"flex flex-col flex-auto justify-center mr-[30px] "}>
                <div className="w-full flex justify-between mb-1">
                    <span className="text-base font-[400] text-[#A2AABD]">{name}</span>
                    <span className="text-sm font-[600] text-[#A2AABD] ">{value}%</span>
                </div>
                <div>
                    <div className="w-full min-h-[30px] bg-gray-200 rounded-full">
                        <div className={`rounded-full bg-[#6749F5] min-h-[30px]`} style={{width: width}}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;