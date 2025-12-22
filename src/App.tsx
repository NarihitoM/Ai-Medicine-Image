import { BrowserRouter, Routes, Route } from "react-router-dom"
import Image from "./pages/Image"
import Protectedroute from "./routes/protectedroute"
import Detail from "./pages/details"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Image/>} />
        <Route path="/detail" element={<Protectedroute><Detail/></Protectedroute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
