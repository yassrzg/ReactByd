import React, { useState, useContext } from 'react';
import axios from 'axios';
import {ProductContext} from "../../../Context/contextProduct";


export default function CreateProduit() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [prix, setPrix] = useState(0);
    const [description, setDescription] = useState('');


    const { createProduit } = useContext(ProductContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('prix', prix);
        formData.append('description', description);


        try {

            const token = localStorage.getItem('token');

            // Ajouter le token dans les en-têtes de la requête
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type' : 'application/json',

                }
            };
            const response = await axios.post('/api/produits', formData, config);
            console.log(response.data); // Afficher la réponse du serveur après la création du produit

            // await createProduit(response.data);
            // Réinitialiser les champs du formulaire après la création réussie
            setTitle('');
            setImage(null);
            setPrix(0);
            setDescription('');
        } catch (error) {
            console.error(error);
            // Gérer les erreurs lors de la création du produit
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result;
            setImage(base64Image);
        };
        reader.readAsDataURL(selectedImage);
    };

    return (
        <div>
            <h2>Créer un produit</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Titre:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br />
                <label>
                    Image:
                    <input type="file" onChange={handleImageChange} />
                </label>
                <br />
                <label>
                    Prix:
                    <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Créer</button>
            </form>
        </div>
    );
}
