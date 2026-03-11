import { Routes, Route, useLocation } from 'react-router-dom'
import App from './App'
import Properties from './components/Properties'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminLogin from './components/admin/AdminLogin'
import AdminHome from './components/admin/AdminHome'
import AddHouseForm from './components/admin/AddHouseForm'
import HouseList from './components/admin/HouseList'
import AdminHeader from './components/admin/AdminHeader'
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ProtectedRouteUser from './components/ProtectedRouteUser'
import Coliving from './components/Rentals/Coliving'
import Apartment from './components/Rentals/Apartment'
import House from './components/Rentals/House'
import Pg from './components/Rentals/Pg'
import ProjectDetails from './components/ProjectDetails'
import Contact from './components/Contact'
import Selling_projects from './components/Selling_projects'
import Land_projects from './components/Land_projects'
import LandList from './components/admin/LandList'
import AddLandForm from './components/admin/AddLandForm'
import RentalList from './components/admin/RentalList'
import AddRentalForm from './components/admin/AddRentalForm'

 const Routing = () => {
  const location = useLocation();

  const hideHeaderFooter = location.pathname.startsWith("/admin");

  return (
    <div className='w-full overflow-hidden'>
      
      {!hideHeaderFooter && <Navbar />}
      {hideHeaderFooter && <AdminHeader/>}

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLogin/>} />

        <Route path="/admin/home" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="/admin/add-house" element={<ProtectedRoute><AddHouseForm /></ProtectedRoute>} />
        <Route path="/admin/add-land" element={<ProtectedRoute><AddLandForm /></ProtectedRoute>} />
        <Route path="/admin/list-house" element={<ProtectedRoute><HouseList /></ProtectedRoute>} />
        <Route path="/admin/list-land" element={<ProtectedRoute><LandList /></ProtectedRoute>} />
        <Route path="/admin/add-rental" element={<ProtectedRoute><AddRentalForm/></ProtectedRoute>} />
        <Route path="/admin/list-rental" element={<ProtectedRoute><RentalList/></ProtectedRoute>} />
        <Route path="/pg" element={<ProtectedRouteUser><Pg/></ProtectedRouteUser>} />
        <Route path="/coliving" element={<ProtectedRouteUser><Coliving/></ProtectedRouteUser>} />
        <Route path="/apartment" element={<ProtectedRouteUser><Apartment/></ProtectedRouteUser>} />
        <Route path="/House" element={<ProtectedRouteUser><House/></ProtectedRouteUser>} />
        <Route path="/pro/items/:id" element={<ProtectedRouteUser><ProjectDetails/></ProtectedRouteUser>} />
        <Route path="/selling_projects" element={
          <ProtectedRouteUser>
            <Selling_projects/>
          </ProtectedRouteUser>}></Route>
        <Route path="/land_projects" element={<ProtectedRouteUser><Land_projects/></ProtectedRouteUser>}></Route>
        {/* <Route path="/properties" element={
          <ProtectedRouteUser>
            <Properties/>
          </ProtectedRouteUser>
        } /> */}

      </Routes>
      {!hideHeaderFooter &&<Contact/>}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};
export default Routing