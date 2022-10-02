import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctorList, setDoctorList] = useState([]);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const callDoctorsApi = async () => {
    const url = "https://healthy-yourself-api.herokuapp.com/doctors";
    const response = await axios.get(url);
    setDoctorList(response.data);
  };

  const bookAppnt = doctor => {
    navigate("/appointment/doctor", { state: doctor });
  };

  useEffect(() => {
    callDoctorsApi();
  }, []);
  return (
    <div>
      <div className="d-flex">
        {doctorList &&
          doctorList.map(doctor => (
            <div
              key={doctor.id}
              className="card mb-3 mx-1"
              style={{ maxWidth: "540px" }}
            >
              <div className="col-md-4 m-2">
                <img
                  className="profile_image rounded"
                  src={
                    doctor.imageurl !== undefined
                      ? doctor.imageurl
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt="profile"
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">{doctor.name}</h3>
                <p>
                  (
                  {doctor.degrees &&
                    doctor.degrees.map(item => <span key={item}>{item}/</span>)}
                  )
                </p>
                <h5>{doctor.spec} Specialist</h5>
                <ul className="list-group list-group-horizontal m-0">
                  {days.map(day => (
                    <li
                      key={day}
                      className={
                        doctor.day.includes(day)
                          ? "list-group-item bg-primary text-light px-2 py-1"
                          : "list-group-item bg-light px-2 py-1"
                      }
                    >
                      {day.charAt(0)}
                    </li>
                  ))}
                </ul>
                <h6>
                  Time: {doctor.from}Hrs. to {doctor.to}Hrs.
                </h6>
                <hr />
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    bookAppnt(doctor);
                  }}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Doctors;
