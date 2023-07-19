import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Image from './Image';
function Indexpage(props) {
  const [places,setPlaces]=useState([]);
  useEffect(()=>{
    axios.get("/places").then(({data})=>{
      setPlaces(data);
    })
  },[])
  return (
    <div>
      <Navbar/>
      <div className="mx-3 my-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (
        <Link key={place._id} to={'/places/'+place._id} className='hover:scale-110'>
          <div className="bg-gray-500 mb-2 rounded-2xl flex ">
            {place.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">Rs.{place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
    </div>
  )
}

export default Indexpage
