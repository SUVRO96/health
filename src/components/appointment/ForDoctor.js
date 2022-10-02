import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ForDoctor = () => {
  const doctor = useLocation().state;
  const [successPost, setSuccessPost] = useState(true);
  const name = useRef();
  const mobile = useRef();
  const date = useRef();
  const time = useRef();
  const error = useRef();

  const submitAppt = async () => {
    const url =
      "https://healthy-yourself-api.herokuapp.com/appoints/addappoint";
    const obj = {};
    obj.id = "app" + parseInt(Math.random() * 10000000);
    obj.doctor = doctor;
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
        setSuccessPost(true);
      } else {
        error.current.textContent = "Oops! Something went wrong. Try again...";
      }
    } else {
      error.current.textContent = "please,fill all the values...";
    }
  };

  return (
    <div className="container">
      {!successPost ? (
        <div>
          <legend>Appointment Form:</legend>
          <div className="mb-3">
            <label className="form-label">Doctor's Name:</label>
            <input className="form-control" value={doctor.name} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Specialist:</label>
            <input className="form-control" value={doctor.spec} disabled />
          </div>

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
            <label className="form-label">Select Day:</label>
            <select className="form-select" ref={date}>
              <option value="">-select-</option>
              {doctor.day.map(day => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Time:</label>
            <p className="text-danger">
              select time between {doctor.from}Hrs. and {doctor.to}Hrs.
            </p>
            <input
              type="time"
              className="form-control"
              min={doctor.from}
              max={doctor.to}
              ref={time}
            />
          </div>
          <div className="mb-3">
            <p ref={error} className="text-danger"></p>
          </div>
          <div className="mb-3">
            <button className="btn btn-success" onClick={submitAppt}>
              Book
            </button>
          </div>
        </div>
      ) : (
        <div className="alert alert-success">
          <h6>Your application has been recieved</h6>
          <Link to="/doctors">Back</Link>
        </div>
      )}
    </div>
  );
};

export default ForDoctor;
