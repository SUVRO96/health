import React, { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const ForService = () => {
  const service = useLocation().state;
  const [success, setSuccess] = useState(false);
  const name = useRef();
  const mobile = useRef();
  const date = useRef();
  const time = useRef();
  const error = useRef();

  const submitAppt = async () => {
    const url =
      "https://healthy-yourself-api.herokuapp.com/appoints/addappoint";
    const obj = {};
    obj.id = "s" + parseInt(Math.random() * 10000000);
    obj.service = service;
    obj.name = name.current.value;
    obj.mobile = mobile.current.value;
    obj.date = date.current.value;
    obj.time = time.current.value;
    if (
      obj.name !== "" &&
      obj.mobile !== "" &&
      obj.date !== "" &&
      obj.time !== ""
    ) {
      const response = await axios.post(url, obj);
      if (response.status === 201) {
        setSuccess(true);
      } else {
        error.current.textContent = "Oops! Something went wrong. Try again...";
      }
    } else {
      error.current.textContent = "please,fill all the values...";
    }
  };
  return (
    <div className="container">
      {!success ? (
        <>
          <legend>Appointment Form:</legend>

          <fieldset disabled>
            <div className="mb-3">
              <label className="form-label">
                {service.type === "surgery" ? "Surgery:" : "Therapy:"}
              </label>
              <input className="form-control" placeholder={service.name} />
            </div>
            <div className="mb-3">
              <label className="form-label">Category:</label>
              <input className="form-control" placeholder={service.category} />
            </div>
          </fieldset>
          <fieldset>
            <div className="mb-3">
              <label className="form-label">Patient's Name:</label>
              <input
                className="form-control"
                placeholder="Patient's Name"
                ref={name}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile:</label>
              <input
                type="number"
                className="form-control"
                placeholder="Mobile"
                ref={mobile}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Select Date:</label>
              <input className="form-control" type="date" ref={date} />
            </div>
            <div className="mb-3">
              <label className="form-label">Time:</label>
              <p className="text-warning">
                select time between 09:00Hrs. and 21:00Hrs.
              </p>
              <input
                type="time"
                className="form-control"
                min="09:00"
                max="21:00"
                ref={time}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-success" onClick={submitAppt}>
                Book
              </button>
            </div>
          </fieldset>
        </>
      ) : (
        <div className="alert alert-success">
          <h6>Your application has been recieved</h6>
          <Link to="/service">Back</Link>
        </div>
      )}
    </div>
  );
};

export default ForService;
