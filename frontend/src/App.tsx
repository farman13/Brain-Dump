import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import Twitter from "./pages/Twitter"
//import YouTube from "./pages/Youtube"
import SharedBrain from "./pages/SharedBrain"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tweets" element={<Twitter />} />
          <Route path="/youtubeContent" element={<YouTube />} />
          <Route path="/brain/:shareLink" element={<SharedBrain />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
