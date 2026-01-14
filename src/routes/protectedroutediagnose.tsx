
import React from "react"
import { Navigate} from "react-router-dom";

interface Props {
    children: React.ReactNode
}

const Protectedroutediagnose = ({ children }: Props) => {
    const datadiagnose = localStorage.getItem("datadiagnose")
    if (!datadiagnose) {
        return <Navigate to="/diagnose" replace />
    }
    else {
        return children;
    }
}

export default Protectedroutediagnose;