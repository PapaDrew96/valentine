import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Katerina from "./Katerina";
import Chryssa from "./Chryssa";
import Phaedra from "./Phaedra";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Katerina" element={<Katerina />} /> 
        <Route path="/Chryssa" element={<Chryssa />} />
        <Route path="/Phaedra" element={<Phaedra />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
