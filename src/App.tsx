import { BrowserRouter, Routes, Route } from "react-router-dom"
import Image from "./pages/Image"
import Protectedroute from "./routes/protectedroute"
import Detail from "./pages/details"
import DiagnoseImage from "./pages/diagnoseimage"
import DetailDiagnose from "./pages/detailsdiagnose"
import Protectedroutediagnose from "./routes/protectedroutediagnose"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Image/>} />
        <Route path="/diagnose" element={<DiagnoseImage/>} />
        <Route path="/detail" element={<Protectedroute><Detail/></Protectedroute>} />
        <Route path="/detaildiagnose" element={<Protectedroutediagnose><DetailDiagnose/></Protectedroutediagnose>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
