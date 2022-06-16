import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import date from 'date-and-time';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Navigator from '../TopNavbar/Navigator'
import AddHotel from '../AddHotel/AddHotel';
import Api from '../../Api/Api.js';


function History() {

  const [hotels, setHotels] = useState([])

  let navigate = useNavigate();


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This property offers great value (measured in terms of - for example - price, star rating, review score and facilities )
      compare to similar properties within this market.
    </Tooltip>
  );


  useEffect(() => {
    const getBookingHistory = async () => {
      try {
        const { data } = await Api.GetBooking();
        console.log(data);
        setHotels(data.bookHistory)
      } catch (e) {
        console.log(e);
      }
    }
    getBookingHistory();
  }, [])


  return (
    <div>
      <Navigator />
      <div className='mx-5' style={{ marginTop: "6%" }}>
        <div className='row'>
          <div className='col-6'>
            <h2>
              Your Booking History
            </h2>
          </div>

        </div>
        <div className='row'>
          {hotels?.map((hotel, index) => {
            const time = hotel
            hotel = hotel.hotelID;
            return <div className='col-12 d-flex my-3 justify-content-between' key={index}
              style={{ color: 'inherit', textDecoration: 'inherit' }} >
              <div className='row' style={{ marginLeft: "0%" }}>
                <div className='col-4'>
                  <img src={hotel.images[0]}
                    className="m-0 p-0"
                    alt='hotel'
                    style={{ width: "100%", height: '200px' }} />
                </div>
                <div className='col-6'>
                  <div className='w-100'>
                    <h6 className='m-0'>
                      <b>{hotel.name}</b>
                    </h6>
                  </div>
                  <small className='text-muted'>{hotel.ownerName}</small>
                  <div>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Button style={{ height: "5%", cursor: "default" }} className="p-1" variant="warning" size="sm">Great Value</Button>
                    </OverlayTrigger>
                  </div>
                  <div>
                    <h5>From</h5>
                    <p>{date.format(new Date(time.from), 'YYYY/MM/DD HH:mm:ss')}</p>
                    <h5>To</h5>
                    <p>{date.format(new Date(time.to), 'YYYY/MM/DD HH:mm:ss')}</p>
                  </div>
                </div>


                <div className='col-2' >
                  <div className='text-white p-1 rounded' style={{ backgroundColor: "#003580" }}>
                    {hotel.rating}
                  </div>
                  <div className=''>
                    <small className='text-muted'>From</small>
                    <h4 className='m-0'>{hotel.price}</h4>
                    <small className='text-muted py-0 m-0'>For tonight</small>
                  </div>
                </div>

              </div>
            </div>
          })}
          {hotels.length === 0 && <div>
            <h5>You Don't have any bookings yet</h5>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default History