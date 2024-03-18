import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Identification/Login/Login.jsx'
import Signup from "./Components/Identification/Singup/Singup.jsx";
import HomeAccount from "./Pages/Home/HomeAccount";
import Produit from "./Pages/Produit/Produit";
import ProduitShow from "./Pages/Produit/ProduitShow";
import Navbar from "./Components/Navbar/Navbar";
import Panier from "./Components/Navbar/Panier";
import Home from "./Components/Home/Home";
import Admin from "./Pages/Admin/Admin";



function App() {

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/account" element={<HomeAccount/>} />
                <Route path="/produit" element={<Produit/>} />
                <Route path="/produit/:id" element={<ProduitShow/>} />
                <Route path="/panier" element={<Panier/>} />
                <Route path="/admin" element={<Admin/>} />


            </Routes>
        </Router>
    );
}

export default App;
