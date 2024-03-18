import {Link, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { PanierContext } from "../../Context/contextPanier";
import "./Navbar.css";
import {UserContext} from "../../Context/context";


export default function Navbar() {
    const { article } = useContext(PanierContext);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        // Supprimez les informations de l'utilisateur du contexte UserContext
        setUser(null);

        // Effectuez toute autre opération de déconnexion nécessaire (par exemple, suppression du token d'authentification)
        localStorage.removeItem("token");

        // Redirigez l'utilisateur vers une page de déconnexion ou une autre page appropriée
        navigate('/');
    };

    return (
        <div id={"navbar"}>
            <Link to={'/'}>Home</Link>
            <Link to={"/account"}>Account</Link>
            <Link to={"/produit"}>Produit</Link>
            <Link to={"/panier"}>
                Mon Panier ({article.length})
            </Link>
            <Link to={"/admin"}>Admin</Link>
            {user ? (
                <>
                    <Link to={"/account"}>Mon Compte</Link>
                    <Link to={"/"} onClick={logout}>Se Déconnecter</Link>
                </>
            ) : (
                <>
                    <Link to={"/signup"}>Inscription</Link>
                    <Link to={"/login"}>Connexion</Link>
                </>
            )}
        </div>
    );
}
