import type { diagnoselist } from "../types/type";
import { useNavigate } from "react-router-dom";
const DetailDiagnose = () => {
    const datadiagnose = localStorage.getItem("datadiagnose");
    const imagediagnose = localStorage.getItem("imagediagnose");
    const navigate = useNavigate();
    const data: diagnoselist | null = datadiagnose ? JSON.parse(datadiagnose) : null;

    return (
        <>
            <div className="flex justify-center items-center py-10">
                <div className="flex flex-col h-auto gap-4 p-5 w-10/12 max-md:w-100 max-sm:w-85 rounded-lg bg-gray-100 shadow-[0_0_10px_0_blue,0_0_20px_0_blue]" style={{ scrollbarWidth: "none" }}>
                    <h1 className="font-bold text-2xl text-blue-600">Details</h1>
                    <img src={imagediagnose!} className="size-50" />
                    <div className="flex flex-col">
                        <h2 className="font-medium">Name</h2>
                        <input disabled type="text" value={data?.title} className="resize-none text-blue-600 font-normal border-2 rounded-lg p-1 border-gray-400 w-full" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-medium">Description</h2>
                        <textarea disabled value={data?.description} className="resize-none text-blue-600 font-normal border-2 rounded-lg p-1 border-gray-400 w-full h-50" style={{ scrollbarWidth: "none" }} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-medium">Sideeffects</h2>
                        <ol className="list-inside list-decimal">
                            {data?.sideeffect.map((element) => (
                                <li className="list-decimal text-blue-600 font-normal">{element}</li>
                            ))}
                        </ol>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-medium">Treatment</h2>
                        <textarea disabled value={data?.treatment} className="resize-none text-blue-600 font-normal border-2 rounded-lg p-1 border-gray-400 w-full h-40" style={{ scrollbarWidth: "none" }} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-medium">Recommendation</h2>
                        <textarea disabled value={data?.recommendation} className="resize-none text-blue-600 font-normal border-2 rounded-lg p-1 border-gray-400 w-full h-40" style={{ scrollbarWidth: "none" }} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-medium">CheckUp</h2>
                        <p>Need to checkup : {data?.checkup ? "Yes" : "No"}</p>
                    </div>
                    <button onClick={() => {
                        localStorage.removeItem("datadiagnose");
                        localStorage.removeItem("imagediagnose");
                        navigate("/diagnose");
                    }} className="p-1 w-full bg-blue-600 font-medium text-white rounded-lg active:translate-y-1">Back</button>
                </div>
            </div>
        </>
    )
}

export default DetailDiagnose;