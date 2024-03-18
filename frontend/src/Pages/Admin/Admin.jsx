import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/context";
import { useNavigate, Navigate } from "react-router-dom";
import CreatProduit from "./Components/CreatProduit";
import GetAllProduct from "./Components/GetAllProduct";
import ProduitAdmin from './Components/ProduitAdmin'
import Create from './Components/creat'
import ShowProduct from "./Components/ShowProduct";


export default function Admin() {
    // const { user } = useContext(UserContext);
    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     // Vérifiez si l'utilisateur n'est pas connecté ou n'a pas le rôle d'admin
    //     if (!user || !user.roles.includes("ROLE_ADMIN")) {
    //         // Redirigez l'utilisateur vers une autre page
    //         navigate("/");
    //     }
    // }, [user, navigate]);
    //
    // if (!user || !user.roles.includes("ROLE_ADMIN")) {
    //     return <Navigate to="/" />; // Utilisez le composant Navigate pour effectuer la redirection
    // }

    return (
        <div>
            <Create/>
            <ShowProduct/>
            {/*<ProduitAdmin/>*/}
        </div>
    );
}
