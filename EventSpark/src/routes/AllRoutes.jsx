import { Route, Routes, useLocation } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CreateEvent from "../pages/CreateEvent"
import  { Login } from "../pages/Authentication"
import AdminPage from "../pages/AdminPage"
import Dashboard from "../Admin/Pages/Dashboard"
import Events from "../Admin/Pages/Events"
import User from "../Admin/Pages/User"
import EventPlanner from "../Admin/Pages/EventPlanner"
import { EventPage } from "../Eventpage/page"
import { PrivateRouter, PrivateRouterUser } from "../Admin/Context/privateRoute"

const AllRoutes = () => {
  // const hideNavbarPaths = [
  //   "/admin",
  //   "/admin/dashboard",
  //   "/admin/eventPlanner",
  //   "/admin/events",
  //   "/admin/users",
  
  // ];
  // const location = useLocation();
  // console.log(location);
  // const isAdminRoute = hideNavbarPaths.includes(location.pathname);
  return (
  <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/events" element={<EventPage />} />
  <Route path="/createevents" element={<PrivateRouterUser><CreateEvent/></PrivateRouterUser>} />
  <Route path="/login" element={<Login />} />
  <Route  path="/admin" element={<AdminPage />} />
  <Route path="/admin/dashboard" element={<Dashboard />} /> 
  <Route path="/admin/users" element={<User />} />
  <Route path="/admin/eventPlanner" element={<EventPlanner />} /> 
  <Route path="/admin/eventsdetail" element={<Events />} /> 
{/* <Route path="/admin" element={<PrivateRouterUser><AdminPage /></PrivateRouterUser>}>
 <Route index element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} /> 
 <Route path="events" element={<PrivateRouterUser><Events /></PrivateRouterUser>} /> 
    <Route path="/users" element={<User />} />
    <Route path="/eventPlanner" element={<EventPlanner />} /> 
 </Route> */}
</Routes>

  )
}

export default AllRoutes
