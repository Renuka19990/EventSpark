import { Route, Routes, useLocation } from "react-router-dom"
import HomePage from "../pages/HomePage"
import FindEvents from "../pages/FindEvents"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CreateEvent from "../pages/CreateEvent"
import Authentication from "../pages/Authentication"
import AdminPage from "../pages/AdminPage"
import Dashboard from "../Admin/Pages/Dashboard"
import Events from "../Admin/Pages/Events"
import User from "../Admin/Pages/User"
import EventPlanner from "../Admin/Pages/EventPlanner"

const AllRoutes = () => {
  const hideNavbarPaths = [
    "/admin",
    "/admin/dashboard",
    "/admin/eventPlanner",
    "/admin/events",
    "/admin/users",
  
  ];
  const location = useLocation();
  console.log(location);
  const isAdminRoute = hideNavbarPaths.includes(location.pathname);
  return (
    <div>
     {!isAdminRoute&& <Navbar/>}
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/findevent" element={<FindEvents/>}/>
        <Route path="/createevents" element={<CreateEvent/>}/>
        <Route path="/authentication" element={<Authentication/>}/>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="events" element={<Events/>} />
          <Route path="users" element={<User/>} />
          <Route path="eventPlanner" element={<EventPlanner/>} />
        </Route>
        <Route/>
      </Routes>
       { !isAdminRoute&&<Footer/>}
    </div>
  )
}

export default AllRoutes
