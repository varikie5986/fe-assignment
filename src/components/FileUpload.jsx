import React, {useRef, useState} from 'react';
import cssLogo from '../assets/logo/cssLogo.png';
import axios from "axios";
import ProgressBar from '../components/ProgressBar';
import WebCheckerResult from "./WebCheckerResult";

const FileUpload = () => {
    const [dragActive, setDragActive] = useState(false);
    const inputFile = useRef(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [response, setResponse] = useState({});
    const [totalTimeObj, setTotalTimeObj] = useState({});
    const host = "http://localhost:8000";

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleFile = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const droppedFile = event.dataTransfer?.files[0] || event?.target?.files[0];

        if (!droppedFile) {
            console.error('No files dropped');
            return;
        }

        const handleUpload = async (url, file, guidValue) => {
            console.log(`start process...`);
            let responseData;

            try {
                const startTime = Date.now();
                const formData = new FormData();
                formData.append("file", file);
                formData.append("guid", guidValue);
                const response = await axios.post(url, formData);
                const endTime = Date.now();
                setTotalTimeObj(getTotalTimeFormatted(endTime - startTime));
                responseData = response?.data;

                setShowResult(true);
                setResponse(responseData);
            } catch (error) {
                setShowResult(false);
                console.error(error);
            } finally {
                inputFile.current.value = null;
                setUploadPercentage(0);
                setSelectedFileName(null);
            }
        };

        setSelectedFileName(droppedFile.name);
        setShowResult(false);

        const url = `${host}/document/upload/csv`;
        const eventSource = new EventSource(`${host}/document/progress`);
        let guidValue = null;

        eventSource.addEventListener("GUI_ID", (event) => {
            guidValue = JSON.parse(event.data);

            eventSource.addEventListener(guidValue, (event) => {
                const result = JSON.parse(event.data);
                if (uploadPercentage !== result) {
                    setUploadPercentage(result);
                }
                if (result === "100") {
                    eventSource.close();
                }
            });
            handleUpload(url, droppedFile, guidValue);
        });
    };

    const handleBrowseClick = () => {
        inputFile.current.click();
    };

    const getTotalTimeFormatted = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return new Map([
            ["minutes", minutes],
            ["seconds", seconds]
        ])
    }

    return (
        <div>
            <div className={`flex justify-center items-center`}>
                <div className={`flex flex-col gap-[10px] mt-[120px] mb-[120px]`}>
                    <h2 className="text-[#64697F] text-[32px] font-[600]">Websites Checker</h2>
                    <div
                        className={`bg-[#F5F7FC] mb-[61px] p-4 min-w-[656px] min-h-[405px] border-dashed border-[#C7CDDB] border-[4px] rounded-[30px] flex flex-col justify-around`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleFile}
                    >
                        <div className={`flex justify-center items-center`}>
                            <div className="w-[100px] h-[100px]">
                                <img src={cssLogo} alt="CSS Logo" />
                            </div>
                        </div>
                        <p className="text-center font-[600] text-[32px] text-[#64697F]">
                            Drag your .csv file here to start uploading.
                        </p>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-[294px] h-px my-8 border-[2px] border-[#B6BED0]" />
                            <span
                                className="font-[600] text-[32px] absolute px-3 text-[#95A1BB] -translate-x-1/2 bg-[#F5F7FC] left-1/2"
                            >
              OR
            </span>
                        </div>
                        <div className={`flex justify-center`}>
                            <input type="file" ref={inputFile} onChange={handleFile} hidden />
                            <button
                                className="bg-[#6749F5] text-white px-4 py-2 rounded-md min-w-[294px] min-h-[85px]"
                                onClick={handleBrowseClick}
                            >
                                <p className={`text-[#FFFFFF] font-[600] text-[32px]`}>Browse File</p>
                            </button>
                        </div>
                    </div>
                    {uploadPercentage > 0 && (
                        <ProgressBar value={uploadPercentage} name={selectedFileName} />
                    )}
                    {showResult && (
                        <WebCheckerResult value={response} totalTimeObj={totalTimeObj} />
                    )}
                </div>
            </div>
        </div>
    );

};

export default FileUpload;
