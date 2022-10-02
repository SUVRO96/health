import axios from "axios";
import React, { useRef, useState } from "react";

const AppointList = () => {
  const mobile = useRef();
  const errorRef = useRef();
  const [appoData, setAppoData] = useState([]);

  const searchFn = async () => {
    if (mobile.current.value !== "") {
      const mNo = mobile.current.value;
      const url = `https://healthy-yourself-api.herokuapp.com/appoints/search/${mNo}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        setAppoData(response.data);
        mobile.current.value = "";
        errorRef.current.textContent = "";
      } else if (response.status === 401) {
        errorRef.current.textContent =
          "please enter the mobile no. used in the application";
      }
    } else {
      errorRef.current.textContent = "please enter mobile number";
    }
  };
  return (
    <div className="container m-2 mt-3">
      <div className="d-flex justify-content-center mt-5 mb-3">
        <div className="shadow col-md-4">
          <div className="card px-5 py-5">
            <div className="form-data text-center">
              <div className="forms-inputs mb-4 text-center">
                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <input
                  className="w-75 p-1"
                  autoComplete="off"
                  type="text"
                  placeholder="enter mobile number"
                  ref={mobile}
                />
              </div>
              <div>
                <div className="text-center">
                  <p className="text-danger" ref={errorRef}></p>
                </div>
              </div>
              <div className="mb-3 text-center">
                <button className="login-btn btn btn-dark" onClick={searchFn}>
                  Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        {appoData &&
          appoData.map(item => (
            <div className=" card ">
              <div className="card-body">
                <p className="card-text">
                  <b>No: </b>
                  {item.id}
                </p>
                {item.doctor && (
                  <>
                    <h5 className="card-title">Dr.{item.doctor.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      {item.doctor.spec}
                    </h6>
                  </>
                )}
                {item.service && (
                  <>
                    <h5 className="card-title">{item.service.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      {item.service.category}
                    </h6>
                  </>
                )}
                <h6 class="card-subtitle mb-2">Patient: {item.name}</h6>
                <p className="card-text">
                  <b>Mobile: </b>
                  {item.mobile}
                </p>
                <p className="card-text">
                  <b>Schedule Time:</b> {item.date} on {item.time}Hrs.
                </p>
                <b>Status: </b>
                <span
                  className={
                    item.status !== "rejected"
                      ? "text-success"
                      : "card-text text-danger"
                  }
                >
                  {item.status}
                </span>
                <hr />
                <button className="btn btn-sm btn-danger align-content-end">
                  cancel Appointment
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AppointList;
