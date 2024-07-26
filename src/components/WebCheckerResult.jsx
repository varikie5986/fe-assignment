import React from "react";

const WebCheckerResult = ({ value, totalTimeObj }) => {

    return (
        <div className={`bg-[#FFFFFF] min-w-[656px] min-h-[347px] rounded-[16px] drop-shadow-[0_0px_7px_rgba(0,0,0,0.15)] flex p-[40px]`}>
            <div className={"flex flex-col  justify-center w-full h-full"}>
                <div className={"flex flex-col mb-[38px]"}>
                    <h1 className={"text-[36px] text-[#64697F] font-[600]"}>Total {value?.data?.total} Websites</h1>
                    <h2 className={"text-[24px] text-[#64697F] font-[600]"}>(Used {totalTimeObj.get("minutes")} minute and {totalTimeObj.get("seconds")} second)</h2>
                </div>
                <div className={"flex justify-center"}>
                    <div className={"flex mr-[50px]"}>
                        <div className={"w-[151px] h-[151px] bg-[#3FE364] flex flex-col p-[10px] rounded-[16px]"}>
                            <p className={"text-[#FFFFFF] text-[24px] font-[600]"}>UP</p>
                            <div className={"flex justify-center w-full h-full text-[72px] text-[#FFFFFF] font-[600]"}>{value?.data?.up}</div>
                        </div>
                    </div>
                    <div className={"flex ml-[50px]"}>
                        <div className={"w-[151px] h-[151px] bg-[#F5F7FC] flex flex-col p-[10px] rounded-[16px]"}>
                            <p className={"text-[#64697F] text-[24px] font-[600]"}>Down</p>
                            <p className={"flex justify-center w-full h-full text-[72px] text-[#64697F] font-[600]"}>{value?.data?.down}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebCheckerResult;