import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import FindEvents from "../pages/FindEvents"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const AllRoutes = () => {
  return (
    <div>
        <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/findevent" element={<FindEvents/>}/>
        <Route/>
      </Routes>
        <Footer/>
    </div>
  )
}

export default AllRoutes
