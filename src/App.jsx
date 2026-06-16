import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Abaya from "./pages/Abaya";
import About from "./pages/About";
import Return from "./pages/Return";
import FormalHijabs from "./pages/FormalHijabs";
import Hijab from "./pages/Hijab";
import Chadar from "./pages/Chadar";
import Contact from "./pages/Contact";
import { AlertProvider } from "./context/AlertContext";



function App() {
  return (
    <AlertProvider>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product" element={<Product />} /> 
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/abaya" element={<Abaya />} />
          <Route path="/about" element={<About />} />
          <Route path="/return" element={<Return />} />
          <Route path="/formal-hijab" element={<FormalHijabs />} />
          <Route path="/hijab" element={<Hijab />} />
          <Route path="/chadar" element={<Chadar />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;