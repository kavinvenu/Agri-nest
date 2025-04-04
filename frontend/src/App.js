import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Farmer from "./components/Farmer";
import Customer from "./components/Customer";
import Middleware from "./components/Middleware";
import OrderDetails from "./components/OrderDetails";
import SelectLocation from "./components/SelectLocation";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";// Import the custom CSS file

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/middleware" element={<Middleware />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/selectLocation" element={<SelectLocation />} />
      </Routes>
    </Router>
  );
};

export default App;
