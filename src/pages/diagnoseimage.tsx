import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";

const DiagnoseImage = () => {
    const [file, setfile] = useState<File | null>();
    const [image, setimage] = useState<any>();
    const [loading, setloading] = useState<boolean>();
    const [error, seterror] = useState<boolean>();
    const [success, setsuccess] = useState<boolean>();
    const [message, setmessage] = useState<string>();
    const navigate = useNavigate();

    const filechange = (e: any) => {
        const filepath = e.target?.files?.[0];
        if (!filepath)
            return;
        setfile(filepath)
        setimage(URL.createObjectURL(filepath));
    }

    const filesubmit = async () => {
        const formdata = new FormData();
        formdata.append("file", file!);
        setloading(true);
        try {
            const response = await axios.post("https://ai-server-for-medicine-image.vercel.app/api/diagnose", formdata);
            if (response.data && response.data.success) {
                if (response.data.data.title === "It is not diagnostics") {
                    setloading(false);
                    seterror(true);
                    setmessage("It is not diagnostics.")
                    setTimeout(() => {
                        seterror(false);
                    }, 3000);
                    return;
                }
                localStorage.setItem("datadiagnose", JSON.stringify(response.data.data));
                localStorage.setItem("imagediagnose", response.data.image);
                setloading(false);
                setsuccess(true);
                setmessage(response.data.message || "Successfully uploaded")
                setTimeout(() => {
                    navigate("/detaildiagnose");
                    setsuccess(false);
                }, 2000);
            }
        }
        catch (err: any) {
            setmessage(err?.response?.data.message);
            setloading(false);
            seterror(true);
            setTimeout(() => {
                seterror(false);
            }, 2000);
        }
    }
    return (
        <>
            {loading &&
                <>
                    <div className="fixed inset-0 z-50 bg-white/5" />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white shadow-lg">
                        <div className="flex flex-col gap-2 items-center">
                            <span className="size-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                            <p className="font-medium text-blue-600">Loading</p>
                        </div>
                    </div>
                </>
            }
            {error &&
                <div className="fixed inset-0 z-50 bg-white/5">
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white shadow-lg">
                        <div className="flex flex-col gap-2 items-center">
                            <span><X className="text-red-600" /></span>
                            <p className="font-medium text-red-600">{message}</p>
                        </div>
                    </div>
                </div>
            }
            {success &&
                <div className="fixed inset-0 z-50 bg-white/5">
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white shadow-lg">
                        <div className="flex flex-col gap-2 items-center">
                            <span><Check className="text-green-600" /></span>
                            <p className="font-medium text-green-600">{message}</p>
                        </div>
                    </div>
                </div>
            }
           
            <div className="h-screen flex flex-col gap-3 justify-center items-center">
                  <div className="flex flex-row justify-center items-center gap-5">
               <Link to="/diagnose" className="text-blue-600 font-medium ">Diagnose</Link>
               <Link to="/" className="text-blue-600 font-medium">Medicine</Link>
            </div>
                <h1 className="Font-bold text-blue-600 text-2xl font-bold">Diagnose Analyser</h1>
                <div className="w-1/2 md:w-auto p-5 bg-white shadow-[0_0_10px_0_blue,0_0_20px_0_blue] rounded-lg flex flex-col gap-5">
                    <label
                        htmlFor="fileUpload"
                        className="flex flex-col w-full items-center justify-center border-2 border-dashed bg-white border-blue-500 rounded-lg p-10 cursor-pointer hover:bg-yellow-50 transition">
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-black">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            image
                        </p>
                        <input
                            id="fileUpload"
                            type="file"
                            onChange={filechange}
                            className="hidden"
                        />
                    </label>
                    {image && <div className="flex justify-center place-items-center">
                        <img src={image} className="size-30 shadow-[0_0_10px_0_blue] rounded-lg"></img>
                    </div>}
                    <button onClick={filesubmit} className="p-1 rounded-lg bg-blue-500 text-white font-medium active:translate-y-1">Analyse</button>
                    <h1 className="text-red-600 font-bold text-xl">PLEASE INPUT CLEAR IMAGE.</h1>
                    <h1 className="text-red-600 font-medium text-center">Ai can make mistakes.</h1>
                </div>
            </div>
        </>
    )
}

export default DiagnoseImage;