import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ForDoctor from "./components/appointment/ForDoctor";
import ForService from "./components/appointment/ForService";
import AppointList from "./components/appointment/AppointList";
import Doctors from "./components/lists/Doctors";
import Services from "./components/lists/Services";
import Nav from "./components/Nav";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <hr />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/services" element={<Services />} />
          <Route path="/appointment/doctor" element={<ForDoctor />} />
          <Route path="/appointment/service" element={<ForService />} />
          <Route path="/appolist" element={<AppointList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
