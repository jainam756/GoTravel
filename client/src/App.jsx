import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Loginpage from './Components/Loginpage'
import Indexpage from './Components/Indexpage'
import Registerpage from './Components/Registerpage'
import axios from 'axios';
import UserState from './Contexts/Usercontext'
import Accountpage from './Components/Accountpage'
import Addplaceform from './Components/Addplaceform'
import PlacePage from './Components/Placepage'
import BookingPage from './Components/BookingPage'
import UserBooking from './Components/UserBooking'

axios.defaults.baseURL="http://127.0.0.1:4000";
axios.defaults.withCredentials=true;
// jainamparekh1104
// FMOrTDF2oRGvdBQM
function App() {
  return (
    <UserState>
      <Routes>
        <Route exact path="/" element={<Indexpage/>} />
        <Route exact path="/login" element={<Loginpage/>}/>
        <Route exact path="/register" element={<Registerpage/>}/>
        <Route exact path="/account" element={<Accountpage/>}/>
        <Route exact path="/account/:subpage?" element={<Accountpage/>}/>
        <Route exact path="/account/user-places/addplace" element={<Addplaceform/>}/>
        <Route exact path="/account/places/:id" element={<Addplaceform/>}/>
        <Route exact path="/places/:id" element={<PlacePage/>}/>
        <Route exact path="/bookings/:id" element={<BookingPage/>}/>
        {/* <Route exact path="/account/user-booking" element={<UserBooking/>}/> */}

      </Routes>
    </UserState>

  )
}

export default App
