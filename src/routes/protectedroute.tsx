
import React from "react"
import { Navigate} from "react-router-dom";

interface Props {
    children: React.ReactNode
}

const Protectedroute = ({ children }: Props) => {
    const data = localStorage.getItem("data");
    if (!data) {
        return <Navigate to="/" replace />
    }
    else {
        return children;
    }
}

export default Protectedroute;