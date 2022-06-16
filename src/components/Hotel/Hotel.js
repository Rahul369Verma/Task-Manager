import React, { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox';
import ReactPhotoGrid from 'react-photo-grid';
import dateFormat, { masks } from "dateformat";
import date from 'date-and-time';
import { useNavigate, useParams } from "react-router-dom";
import { ImageGroup, Image } from 'react-fullscreen-image'
import Api from '../../Api/Api';
import Navigator from '../TopNavbar/Navigator';
import "./Hotel.css";

function Hotel() {

  let { id } = useParams();
  const [hotel, setHotel] = useState(false)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  let navigate = useNavigate();

  const now = new Date();






  useEffect(() => {
    const getHotel = async () => {
      try {
        const { data } = await Api.GetHotel(id);
        // console.log(data);
        setHotel(data)
      } catch (e) {
        console.log(e);
      }
    }
    getHotel();
  }, [id])


  const submitBooking = async () => {
    if ((fromDate === "") || (toDate === "")) {
      alert("set From and To and then submit");
      return;
    }
    try {
      const { data } = await Api.Booking(id, fromDate, toDate);
      console.log(data);
      navigate("/history")

      // setHotel(data)
    } catch (e) {
      console.log(e);
    }
  }

  console.log(fromDate);


  return (
    <div>
      <Navigator />
      {hotel && <div className='mx-5' style={{ marginTop: "6%" }}>
        <h1>{hotel.name}</h1>
        <small>{hotel.address}</small>
        <div className='my-3'>
          <ImageGroup>
            <ul className="images">
              {hotel.images.map(i => (
                <li key={i}>
                  <Image
                    src={i}
                    alt="nature"

                  />
                </li>
              ))}
            </ul>
          </ImageGroup>
        </div>
        <h3>Book This Hotel</h3>
        <div className="form-group width-100">
          <label className="pl-0 color-b label-d">
            From*
          </label>
          <input
            type="datetime-local"
            style={{ width: "300px" }}
            value={fromDate}
            name="launchDate"
            onChange={(e) => {
              console.log(e.target.value);
              setFromDate(
                e.target.value,
              );
            }}
            className="form-control input-field"
            ddata-provide="datepicker"
            data-date-autoclose="true"
            placeholder="Pick Launch Date"
          />
          <label className="pl-0 color-b label-d">
            To*
          </label>
          <input
            type="datetime-local"
            style={{ width: "300px" }}
            value={toDate}
            name="launchDate"
            onChange={(e) => {
              console.log(e.target.value);
              setToDate(
                e.target.value,
              );
            }}
            className="form-control input-field"
            ddata-provide="datepicker"
            data-date-autoclose="true"
            placeholder="Pick Launch Date"
          />
          <button className='btn btn-primary mt-4' onClick={submitBooking}>Book Hotel</button>
        </div>
        <h3 className='mt-4'>Description</h3>
        <p>{hotel.description}</p>
      </div>

      }


    </div>
  )
}

export default Hotel