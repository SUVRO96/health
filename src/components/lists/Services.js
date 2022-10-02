import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [serviceList, setServiceList] = useState([]);
  const [type, setType] = useState("surgery");
  const navigate = useNavigate();

  const callServiceApi = async () => {
    const url = `https://healthy-yourself-api.herokuapp.com/service/type/${type}`;
    const response = await axios.get(url);
    setServiceList(response.data);
  };

  const bookAppnt = item => {
    navigate("/appointment/service", { state: item });
  };

  useEffect(() => {
    callServiceApi();
  }, [type]);

  return (
    <div className="container">
      <select
        className="form-select shadow-none"
        onChange={e => {
          setType(e.target.value);
        }}
      >
        <option value="surgery">Surgery</option>
        <option value="therapy">Therapy</option>
      </select>
      <br />
      <div className="d-flex">
        {serviceList &&
          serviceList.map(item => (
            <div className="card" style={{ maxWidth: "300px" }}>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {item.category}
                </h6>
                <b style={{ textDecoration: "underline" }}>
                  {item.type === "surgery" ? "Surgion:" : "Doctor: "}
                </b>
                <p>
                  {item.doctors.map(d => (
                    <>{d},</>
                  ))}
                </p>
                <p
                  className="card-text text-sm m-0"
                  style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  Description:
                </p>
                <p className="card-text text-sm">{item.description}</p>
                <p className="card-text">
                  <b>Cost: </b>
                  {item.cost !== undefined ? `₹${item.cost}` : "Not disclosed"}
                </p>
                <hr />
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    bookAppnt(item);
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

export default Services;
