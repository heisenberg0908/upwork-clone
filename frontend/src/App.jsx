import { BrowserRouter,Route,Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { Jobs } from "./pages/jobs"
import { Postjob } from "./pages/postjob"
import { Signin } from "./pages/signin"
import { Signup } from "./pages/signup"
import { Profile } from "./pages/profile"
import { PostedJobsByMe } from "./pages/jobspostedbyme"
function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/jobspostedbyme" element={<PostedJobsByMe/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/jobs" element={<Jobs/>}/>
      <Route path="/postjob" element={<Postjob/>}/>
      <Route path="/myprofile" element={<Profile/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
