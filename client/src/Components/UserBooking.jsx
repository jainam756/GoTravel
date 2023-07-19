import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import Mapbooking from "./Mapbooking";

export default function UserBooking() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/user-bookings").then(({data}) => {
      setBookings(data);
    });
  }, []);
  return (
    <div>
      {bookings?.length > 0 &&
        bookings.map((booking) => (
          <Mapbooking booking={booking}/>
        ))}
    </div>
  );
}
