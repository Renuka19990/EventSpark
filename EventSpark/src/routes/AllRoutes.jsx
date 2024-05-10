import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import FindEvents from "../pages/FindEvents"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AdminPage from "../pages/AdminPage"

const AllRoutes = () => {
  return (
    <div>
        <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/findevent" element={<FindEvents/>}/>
       <Route path="/admin" element={<AdminPage/>}/>
        <Route/>
      </Routes>
        <Footer/>
    </div>
  )
}

export default AllRoutes
